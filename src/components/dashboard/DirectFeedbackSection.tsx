'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import CustomToggle from './CustomToggle'

interface DirectFeedbackSectionProps {
    username: string | undefined
    isReceivingFeedback: boolean
    onToggleFeedback: () => void
    isToggling: boolean
}

export const DirectFeedbackSection: React.FC<DirectFeedbackSectionProps> = ({
    username,
    isReceivingFeedback,
    onToggleFeedback,
    isToggling
}) => {
    const copyDirectFeedbackLink = () => {
        const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/feedback/${username}`
        navigator.clipboard.writeText(link)
        toast.success('Direct feedback link copied to clipboard!')
    }

    return (
        <Card className="cardBg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Direct Feedback</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1">
                        <Label className="text-sm text-muted-foreground mb-2 block">
                            Your Direct Feedback Link
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/feedback/${username}`}
                                readOnly
                                className="font-mono text-sm"
                            />
                            <Button
                                onClick={copyDirectFeedbackLink}
                                variant="outline"
                                size="icon"
                                className="border-purple-500/30 hover:bg-purple-500/10"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <CustomToggle isActive={isReceivingFeedback} isToggling={isToggling} onToggleFeedback={onToggleFeedback} />
            </CardContent>
        </Card>
    )
}

