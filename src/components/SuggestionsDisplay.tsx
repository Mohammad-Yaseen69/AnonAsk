import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuggestionsDisplayProps {
    suggestions: string[]
    isLoading?: boolean
    onSuggestionClick?: (suggestion: string) => void
}

export const SuggestionsDisplay = ({
    suggestions,
    isLoading,
    onSuggestionClick
}: SuggestionsDisplayProps) => {
    if (isLoading) {
        return (
            <Card className="cardBg mt-4">
                <CardHeader>
                    <CardTitle className="text-xl gradientText flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                        <p className="text-sm text-muted-foreground">Generating suggestions...</p>
                    </div>
                </CardContent>
            </Card>
        )
    }
        
    return (
        <Card className="cardBg mt-4">
            <CardHeader>
                <CardTitle className="text-xl gradientText flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Suggestions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground font-semibold mb-4">
                        Click on a suggestion to use it as your response
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="h-auto py-3 px-4 text-left justify-start hover:bg-purple-500/10 hover:border-purple-500/50 border-slate-700 text-muted-foreground hover:text-white transition-all"
                                onClick={() => onSuggestionClick?.(suggestion)}
                            >
                                <span className="gradientText font-semibold mr-2">
                                    {index + 1}.
                                </span>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}