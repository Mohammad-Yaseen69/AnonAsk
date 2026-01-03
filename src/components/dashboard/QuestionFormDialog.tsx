'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { QuestionInput } from '@/schemas/Questions.validation'
import { toast } from 'sonner'

interface QuestionFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    questionText: string
    onQuestionTextChange: (text: string) => void
    onSubmit: (data: QuestionInput) => void
    onCancel: () => void
    isSubmitting: boolean
    error?: string
    submitLabel?: string
}

export const QuestionFormDialog: React.FC<QuestionFormDialogProps> = ({
    open,
    onOpenChange,
    title,
    description,
    questionText,
    onQuestionTextChange,
    onSubmit,
    onCancel,
    isSubmitting,
    error,
    submitLabel = 'Submit'
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (questionText.trim().length < 3) {
            toast.error('Question must be at least 3 characters long')
            return
        }
        if (questionText.trim().length > 200) {
            toast.error('Question must be less than 200 characters')
            return
        }
        onSubmit({ questionText: questionText.trim() })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] cardBg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="questionText">Question Text</Label>
                        <Input
                            id="questionText"
                            placeholder="Enter your question..."
                            maxLength={200}
                            value={questionText}
                            onChange={(e) => onQuestionTextChange(e.target.value)}
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {questionText.length}/200 characters
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            style={{
                                padding: "0 15px"
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="gradientBtn"
                            style={{
                                padding: "0 15px"
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

