import { randomUUID } from "crypto"
import { redis } from "@/lib/redis"
import { ApiResponse } from "@/helpers/apiResponse"

const TOKEN_TTL = 60 * 2

export async function GET(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

        console.log(req.headers.get("x-forwarded-for"), req.headers.get('x-real-ip'))
        const rateKey = `suggest:rate:${ip}`
        const hits = await redis.incr(rateKey)

        if (hits === 1) {
            await redis.expire(rateKey, 60)
        }

        if (hits > 10) {
            return Response.json(
                ApiResponse(429, "Too many token requests"),
                { status: 429 }
            )
        }

        const token = randomUUID()

        const tokenKey = `suggest:token:${token}`

        await redis.set(
            tokenKey,
            JSON.stringify({
                ip,
                createdAt: Date.now(),
            }),
            { ex: TOKEN_TTL }
        )

        return Response.json(
            ApiResponse(200, "Token generated", { token }),
            { status: 200 }
        )
    } catch (err) {
        console.error("Token generation error:", err)
        return Response.json(
            ApiResponse(500, "Failed to generate token"),
            { status: 500 }
        )
    }
}
