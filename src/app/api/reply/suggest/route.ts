import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { ApiResponse } from "@/helpers/apiResponse"
import { redis } from "@/lib/redis"

const prompt = `Generate 2-5 short, natural reply suggestions for the given question. Format: "Suggestion one | Suggestion two | Suggestion three". No explanations, numbering, or extra text make sure to give atleast 5 suggestions. If the question is inappropriate (sexual, harmful, or offensive), respond only with: "Sorry, can't provide suggestions for this question!"`

export async function POST(req: Request) {
    try {
        const { question } = await req.json()

        if (!question || typeof question !== 'string') {
            return Response.json(ApiResponse(400, "Question is required"), { status: 400 })
        }

        const cacheKey = `suggestion:${question.trim().toLowerCase()}`

        const cachedSuggestions = await redis.get(cacheKey)

        if (cachedSuggestions) {
            console.log('Cache HIT:', question.substring(0, 50))
            return new Response(cachedSuggestions as string, {
                headers: {
                    'Content-Type': 'text/plain',
                    'X-Cache': 'HIT'
                }
            })
        }

        console.log('Cache MISS:', question.substring(0, 50))

        const result = await streamText({
            model: openai("gpt-3.5-turbo"),
            system: prompt,
            messages: [
                {
                    role: "user",
                    content: question
                }
            ],
            maxOutputTokens: 80,
            maxRetries: 2
        })

        const fullText = await result.text

        await redis.set(cacheKey, fullText, { ex: 60 * 60 * 24 * 7 })

        console.log('Cached for:', question.substring(0, 50))

        return new Response(fullText, {
            headers: {
                'Content-Type': 'text/plain',
                'X-Cache': 'MISS'
            }
        })

    } catch (error) {
        console.error('Error in suggest API:', error)
        return Response.json(
            ApiResponse(500, "Failed to generate suggestions"),
            { status: 500 }
        )
    }
}