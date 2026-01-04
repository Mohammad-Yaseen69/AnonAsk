'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-card/10 py-24 px-4 sm:px-6 lg:px-16">
            <div className="max-w-5xl mx-auto space-y-12">
                <header className="text-center">
                    <h1 className="text-5xl font-bold gradientText mb-4">Terms & Conditions</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using AnonAsk.
                    </p>
                </header>

                <section className="space-y-8">
                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">Use Responsibly</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                You must use AnonAsk responsibly. Illegal, harmful, or offensive content is prohibited.
                            </p>
                            <p>
                                Violation may lead to temporary or permanent restriction from the platform.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">AI Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                AI suggestions are meant to guide your responses. You are fully responsible for the content you post.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">Account & Privacy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                Anonymous questions and replies cannot be traced back to you. Protect your login credentials to maintain account safety.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">Changes to Terms</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                Terms may be updated occasionally. Continued use implies acceptance of the latest terms.
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}

export default TermsAndConditions