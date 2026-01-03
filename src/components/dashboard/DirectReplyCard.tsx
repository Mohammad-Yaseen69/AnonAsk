'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Repliestype } from '@/models/Replies.model'
import { MoreVertical, Trash2 } from 'lucide-react'

interface DirectReplyCardProps {
    reply: Repliestype
    onDelete: (replyId: string | unknown) => void
}

export const DirectReplyCard: React.FC<DirectReplyCardProps> = ({
    reply,
    onDelete
}) => {
    return (
        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">{reply.content}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => onDelete(reply._id)}
                                variant="destructive"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}

