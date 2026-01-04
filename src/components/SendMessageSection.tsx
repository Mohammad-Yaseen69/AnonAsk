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

interface Props {
    isDirectReply: boolean
    questionId?: string
    userId: string
    suggestions?: string[]
    isLoading?: boolean
}

const SendMessageSection = ({
    isDirectReply,
    questionId,
    userId,
    suggestions,
    isLoading,
}: Props) => {
    const [content, setContent] = useState("")
    const createMutation = useMutation({
        mutationFn: (payload: CreateReplyInput) => createReply(payload),
        onSuccess: () => {
            toast.success('Reply sent successfully')
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

        createMutation.mutate(payload)
    }

    return (
        <>
            <Card className="cardBg mt-3">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Direct Feedback Response</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4 items-end">
                        <div className="flex-1 w-full">
                            <Label className="text-sm text-muted-foreground mb-2 block">
                                Enter your response
                            </Label>
                            <div className="flex flex-col items-end">
                                <Input
                                    value={content}
                                    className="h-11 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder='Type here..'
                                    maxLength={200}
                                />
                                <span className='gradientText font-semibold text-sm mt-1'>
                                    {content.length}/200
                                </span>
                            </div>
                        </div>

                        <Button onClick={sendReply} disabled={!content || createMutation.isPending} className='gradientBtn px-6'>
                            {
                                createMutation.isPending ?
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                    : "Send Response"
                            }
                        </Button>
                    </div>

                </CardContent>
            </Card>

            <SuggestionsDisplay
                suggestions={suggestions || []}
                isLoading={isLoading}
                onSuggestionClick={(suggestion) => setContent(suggestion)}
            />
        </>
    )
}

export default SendMessageSection
