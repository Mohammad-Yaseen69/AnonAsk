'use client'

import SendMessageSection from '@/components/SendMessageSection'
import { UserType } from '@/models/User.model'
import { getAISuggestion, getQuestionInformation } from '@/queries/Reply'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

const QuestionReply = () => {
    const params = useParams()
    const { questionId } = params


    const { data: question, isLoading: isUserFetching } = useQuery({
        queryKey: ['User', questionId],
        queryFn: () => getQuestionInformation(questionId as string),
        enabled: !!questionId
    })

    const { data: suggestions, isLoading: isSuggesting } = useQuery({
        queryKey: ["AISuggestions", questionId],
        queryFn: () => getAISuggestion(question?.questionText || ''),
        enabled: !!question?.questionText
    })


    console.log(suggestions)

    const user = question?.userId as UserType | undefined


    return (
        <div className="min-h-screen max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="gradientText font-bold text-[30px]">
                        Annonymous Message
                    </h1>
                    <p className="font-semibold mt-1 text-foreground text-sm">
                        Answer this question anonymously for, {user?.fullName}
                    </p>
                    <SendMessageSection
                        isDirectReply={false}
                        userId={user?._id?.toString() || ''}
                        questionId={questionId?.toString() || ''}
                        suggestions={suggestions}
                        isLoading={isSuggesting || isUserFetching}
                        isAISuggestions={true}
                        questionText={question?.questionText}
                    />
                </div>
            </div>
        </div>
    )
}

export default QuestionReply
