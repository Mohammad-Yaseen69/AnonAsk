'use client'

import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { createReply } from '@/queries/Reply'
import { CreateReplyInput } from '@/schemas/Replies.validation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { SuggestionsDisplay } from './SuggestionsDisplay'
import { SendMessageSkeleton } from './skeletons/SendMessageSkeleton'

interface Props {
    isDirectReply: boolean
    questionId?: string
    userId: string
    suggestions?: string[]
    isLoading?: boolean
    isAISuggestions: boolean
    questionText?: string
}

const SendMessageSection = ({
    isDirectReply,
    questionId,
    userId,
    suggestions,
    isLoading,
    isAISuggestions,
    questionText
}: Props) => {
    const [content, setContent] = useState("")
    const createMutation = useMutation({
        mutationFn: (payload: CreateReplyInput) => createReply(payload),
        onSuccess: () => {
            toast.success('Your message has been sent!')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const sendReply = () => {
        const payload: CreateReplyInput = {
            content,
            isDirectReply,
            questionId,
            userId
        }
        createMutation.mutateAsync(payload).finally(() => setContent(""))
    }

    if (isLoading) return <SendMessageSkeleton />

    return (
        <>
            <Card className="cardBg mt-3">
                {questionText && (
                    <CardHeader>
                        <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                            <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                                Question: &quot;{questionText}&quot;
                            </span>

                        </CardTitle>
                    </CardHeader>
                )}
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4 items-end">
                        <div className="flex-1 w-full">
                            <Label className="text-sm text-muted-foreground font-semibold mb-2 block">
                                Type your anonymous response
                            </Label>
                            <div className="flex flex-col items-end">
                                <Input
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your message here..."
                                    className="h-11 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                                    maxLength={200}
                                />
                                <span className='gradientText font-semibold text-sm mt-1'>
                                    {content.length}/200
                                </span>
                            </div>
                        </div>

                        <Button
                            onClick={sendReply}
                            disabled={!content || createMutation.isPending}
                            className='gradientBtn px-6'
                        >
                            {createMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Response"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <SuggestionsDisplay
                suggestions={suggestions || []}
                isLoading={isLoading}
                isAI={isAISuggestions}
                onSuggestionClick={(suggestion) => setContent(suggestion)}
            />
        </>
    )
}

export default SendMessageSection