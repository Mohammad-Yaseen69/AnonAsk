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
import { QuestionType } from '@/models/Questions.model'
import { MoreVertical, Eye, Trash2, Edit, CheckCircle2, XCircle } from 'lucide-react'

interface QuestionCardProps {
    question: QuestionType
    onView: (question: QuestionType) => void
    onEdit: (question: QuestionType) => void
    onDelete: (questionId: string | unknown) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    onView,
    onEdit,
    onDelete
}) => {
    return (
        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardContent className="px-5">
                <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-left line-clamp-2 mb-2">
                                {question.questionText}
                            </p>
                            <div className="flex items-center gap-2">
                                {question.isActive ? (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs bg-green-500/10 text-green-500 border border-green-500/20">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                                        <XCircle className="h-3 w-3" />
                                        Inactive
                                    </span>
                                )}
                                <span className="text-xs text-muted-foreground">
                                    {question.feedbackAnswers?.length || 0} replies
                                </span>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onView(question)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onEdit(question)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit question text
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(question._id)}
                                    variant="destructive"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

