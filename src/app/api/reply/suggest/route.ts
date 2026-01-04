import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { ApiResponse } from "@/helpers/apiResponse"
import { redis } from "@/lib/redis"

const prompt = `Generate 2-5 short, natural reply suggestions for the given question. Format: "Suggestion one | Suggestion two | Suggestion three". No explanations, numbering, or extra text make sure to give atleast 5 suggestions. If the question is inappropriate (sexual, harmful, or offensive), respond only with: "Sorry, can't give answer for this question! IMPORTANT: Make sure to keep the complete response under 80 tokens.`

export const runtime = 'edge'

export async function POST(req: Request) {
    try {
        const { question } = await req.json()
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

        if (!question || typeof question !== "string") {
            return Response.json(ApiResponse(400, "Question is required"), {
                status: 400,
            })
        }

        const cacheKey = `suggestion:${question.trim().toLowerCase()}`
        const cachedSuggestions = await redis.get(cacheKey)

        if (cachedSuggestions) {
            console.log("Cache HIT:", question.substring(0, 50))
            return new Response(cachedSuggestions as string)
        }

        const rateKey = `suggest:rate:${ip}`
        const hits = await redis.incr(rateKey)

        if (hits === 1) {
            await redis.expire(rateKey, 60)
        }

        if (hits > 10) {
            return Response.json(
                ApiResponse(429, "Too many requests. Please try again later."),
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': '10',
                        'X-RateLimit-Remaining': '0',
                        'Retry-After': '60'
                    }
                }
            )
        }

        // Token verification logic - commenting down for now will implement in future if needed.
        // const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
        // if (!token || typeof token !== "string") {
        //     return Response.json(ApiResponse(401, "Token is required"), {
        //         status: 401,
        //     })
        // }

        // const tokenKey = `suggest:token:${token}`
        // const tokenDataRaw = await redis.get(tokenKey)

        // if (!tokenDataRaw) {
        //     return Response.json(ApiResponse(401, "Invalid or expired token"), {
        //         status: 401,
        //     })
        // }

        // let tokenData;
        // if (typeof tokenDataRaw === 'string') {
        //     tokenData = JSON.parse(tokenDataRaw)
        // } else {
        //     tokenData = tokenDataRaw
        // }

        // if (tokenData.ip !== ip) {
        //     return Response.json(ApiResponse(401, "Token IP mismatch"), {
        //         status: 401,
        //     })
        // }

        // await redis.del(tokenKey)



        const result = await streamText({
            model: openai("gpt-4o-mini"),
            system: prompt,
            messages: [{ role: "user", content: question }],
            maxOutputTokens: 80,
            maxRetries: 2,
        })

        const fullText = await result.text

        await redis.set(cacheKey, fullText, { ex: 60 * 60 * 24 * 7 })
        console.log("Cached for:", question.substring(0, 50))

        return new Response(fullText, {
            headers: {
                "Content-Type": "text/plain",
                "X-Cache": "MISS",
                'X-RateLimit-Limit': '10',
                'X-RateLimit-Remaining': String(10 - hits),
            },
        })
    } catch (error) {
        console.error("Error in suggest API:", error)
        return Response.json(ApiResponse(500, "Failed to generate suggestions"), {
            status: 500,
        })
    }
}