'use client'

import React from 'react'
import { MessageSquare } from 'lucide-react'

interface EmptyStateProps {
    icon?: React.ReactNode
    message: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />,
    message
}) => {
    return (
        <>
            {icon}
            <p className="text-muted-foreground">{message}</p>
        </>
    )
}

