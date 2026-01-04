import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const FeedbackSkeleton = () => {
    return (
        <Card className="cardBg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 flex-1 rounded-md" />
                            <Skeleton className="h-8 w-10 rounded-md" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-8 w-24 rounded-full mt-2" />
            </CardContent>
        </Card>
    )
}

export default FeedbackSkeleton
