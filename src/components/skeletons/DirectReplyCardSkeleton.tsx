'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const DirectReplyCardSkeleton: React.FC = () => {
    return (
        <Card className="border-purple-500/20 animate-pulse">
            <CardContent className="p-4 flex items-start justify-between gap-4">
                {/* Text placeholder */}
                <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-3/4 rounded-md mb-1" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                </div>

                {/* Dropdown button placeholder */}
                <Skeleton className="h-8 w-8 rounded-full" />
            </CardContent>
        </Card>
    )
}
