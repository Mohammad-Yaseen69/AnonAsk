'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const QuestionCardSkeleton: React.FC = () => {
    return (
        <Card className="border-purple-500/20 animate-pulse">
            <CardContent className="px-5 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-4 w-3/4 rounded-md" />
                        <Skeleton className="h-4 w-1/2 rounded-md" />

                        <div className="flex items-center gap-2 mt-1">
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-5 w-12 rounded-full" />
                        </div>
                    </div>

                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </CardContent>
        </Card>
    )
}