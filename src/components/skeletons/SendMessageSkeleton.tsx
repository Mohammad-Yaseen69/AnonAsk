'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const SendMessageSkeleton = () => {
    return (
        <>
            <Card className="cardBg mt-3 animate-pulse">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-1/2 rounded-md" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-11 w-full rounded-md" />
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-32 rounded-lg" />
                    </div>
                </CardContent>
            </Card>

            <Card className="cardBg mt-4 animate-pulse">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-40 rounded-md" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-md" />
                    ))}
                </CardContent>
            </Card>
        </>
    )
}
