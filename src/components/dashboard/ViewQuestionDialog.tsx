'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuestionType } from '@/models/Questions.model'
import { Repliestype } from '@/models/Replies.model'
import { Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import CustomToggle from './CustomToggle'

interface ViewQuestionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    question: QuestionType | null
    questionWithReplies: QuestionType | null
    isActive: boolean
    onToggleActive: (checked: boolean) => void
    onRefresh: () => void
    isUpdating: boolean
}

export const ViewQuestionDialog: React.FC<ViewQuestionDialogProps> = ({
    open,
    onOpenChange,
    question,
    questionWithReplies,
    isActive,
    onToggleActive,
    onRefresh,
    isUpdating
}) => {
    const copyQuestionLink = (questionId: string | unknown) => {
        const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/question/${String(questionId)}`
        navigator.clipboard.writeText(link)
        toast.success('Question link copied to clipboard!')
    }

    if (!question) return null

    const replies = questionWithReplies?.feedbackAnswers || []
    const replyCount = replies.length || question.feedbackAnswers?.length || 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] cardBg overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Question Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-4 border rounded-xl border-gray-800 ">
                    <div className="space-y-2">
                        <Label>Question</Label>
                        <p className="text-sm bg-muted rounded-md">
                            {question.questionText}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label>Question Link</Label>
                        <div className="flex gap-2">
                            <Input
                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/question/${String(question._id)}`}
                                readOnly
                                className="font-mono text-sm"
                            />
                            <Button
                                onClick={() => copyQuestionLink(question._id)}
                                variant="outline"
                                size="icon"
                                className="border-purple-500/30 hover:bg-purple-500/10"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <CustomToggle
                        isActive={isActive}
                        onQuestionToggle={onToggleActive as () => void}
                        isToggling={isUpdating}
                        isInQuestion
                    />
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Replies ({replyCount})</Label>
                            <Button
                                onClick={onRefresh}
                                variant="outline"
                                size="sm"
                                className="border-purple-500/30 hover:bg-purple-500/10"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {replies.length > 0 ? (
                                replies.map((reply: unknown, index: number) => {
                                    const replyContent = typeof reply === 'object' && reply !== null && 'content' in reply
                                        ? (reply as Repliestype).content
                                        : String(reply)
                                    return (
                                        <Card key={index} className="border-purple-500/10">
                                            <CardContent className="p-3">
                                                <p className="text-sm">{replyContent}</p>
                                            </CardContent>
                                        </Card>
                                    )
                                })
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No replies yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

