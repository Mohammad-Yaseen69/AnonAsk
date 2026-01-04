'use client'

import SendMessageSection from '@/components/SendMessageSection'
import { getDirectSuggestions } from '@/helpers/getDirectSuggestions'
import { getUserInformation } from '@/queries/Reply'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DirectFeedBack = () => {
    const params = useParams()
    const { username } = params
    const [suggestions, setSuggestions] = useState<string[]>([]) // Initialize empty



    const { data: user, isLoading: isUserFetching } = useQuery({
        queryKey: ['User', username],
        queryFn: () => getUserInformation(username as string),
        enabled: !!username
    })

    useEffect(() => {
        const fetchSuggestions = () => {
            const suggestions = getDirectSuggestions(5)
            setSuggestions(suggestions)
        }
        fetchSuggestions()
    }, [])
    return (
        <div className="min-h-screen max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="gradientText font-bold text-[30px]">
                        Annonymous Message
                    </h1>
                    <p className="font-semibold mt-1 text-foreground text-sm">
                        Send annoymous message to, {user?.fullName}
                    </p>
                    <SendMessageSection
                        isDirectReply={true}
                        userId={user?._id?.toString() || ''}
                        suggestions={suggestions}
                        isLoading={isUserFetching}
                        isAISuggestions={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default DirectFeedBack
