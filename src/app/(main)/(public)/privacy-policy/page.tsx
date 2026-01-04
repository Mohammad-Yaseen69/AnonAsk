'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-card/10 py-24 px-4 sm:px-6 lg:px-16">
            <div className="max-w-5xl mx-auto space-y-12">
                <header className="text-center">
                    <h1 className="text-5xl font-bold gradientText mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We value your privacy. Here&apos;s how we protect your data and ensure anonymity.
                    </p>
                </header>

                <section className="space-y-8">
                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">Your Data is Private</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                At AnonAsk, all questions and answers are anonymous. We do not store personal details unless required for account functionality.
                            </p>
                            <p>
                                Your identity is never shared, and we never sell or provide your data to third parties.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">AI & Cookies</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                We use AI to provide intelligent reply suggestions. AI processing never stores your identity.
                            </p>
                            <p>
                                Cookies are used minimally to improve experience, like remembering session state or caching AI suggestions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">Your Rights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                You can request deletion of your account at any time. Anonymous questions and replies cannot be traced back to you.
                            </p>
                            <p>
                                We encourage safe and responsible use of AnonAsk while respecting other users.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <CardHeader>
                            <CardTitle className="text-2xl gradientText">Policy Updates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>
                                This Privacy Policy may be updated occasionally. Continued use of the platform indicates acceptance of changes.
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}

export default PrivacyPolicy