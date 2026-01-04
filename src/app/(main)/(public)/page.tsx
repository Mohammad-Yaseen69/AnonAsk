import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Sparkles, Shield, Zap, ArrowRight, Users, Brain } from 'lucide-react'

const Home = () => {
    return (
        <div className="min-h-screen">

            <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-transparent to-violet-900/20" />
                <div className="container mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-purple-300">AI-Powered Anonymous Q&A</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="gradientText">Ask Anonymously,</span>
                            <br />
                            <span className="text-foreground">Get Honest Answers</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            AnonAsk is a privacy-first platform where you can ask questions anonymously and receive genuine feedback.
                            Powered by AI suggestions to help you craft the perfect responses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <Link href="/sign-up">
                                <Button size="lg" className="gradientBtn text-lg px-8 py-6 rounded-lg">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/sign-in">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-lg border-purple-500/30 hover:bg-purple-500/10">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            What <span className="gradientText">AnonAsk</span> Offers
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Everything you need for anonymous, honest conversations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                    <Shield className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle>Complete Anonymity</CardTitle>
                                <CardDescription>
                                    Ask questions without revealing your identity. Your privacy is our top priority.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                    <Brain className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle>AI-Powered Suggestions</CardTitle>
                                <CardDescription>
                                    Get intelligent reply suggestions powered by advanced AI to help you respond effectively.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                    <MessageSquare className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle>Direct Feedback</CardTitle>
                                <CardDescription>
                                    Receive direct anonymous feedback from others or answer questions about specific topics.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle>Lightning Fast</CardTitle>
                                <CardDescription>
                                    Get instant responses with our optimized platform. No waiting, just answers.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle>Control Your Privacy</CardTitle>
                                <CardDescription>
                                    Toggle feedback settings on or off. You decide when you want to receive anonymous questions.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                                    <Sparkles className="h-6 w-6 text-purple-400" />
                                </div>
                                <CardTitle>Smart & Secure</CardTitle>
                                <CardDescription>
                                    Built with modern security practices and smart caching for the best experience.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            How <span className="gradientText">AnonAsk</span> Works
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Simple, secure, and anonymous in three easy steps
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-linear-to-br from-purple-600 to-violet-600 flex items-center justify-center mx-auto text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-semibold">Create Your Profile</h3>
                            <p className="text-muted-foreground">
                                Sign up and create your anonymous profile. Choose a username and set your privacy preferences.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-linear-to-br from-purple-600 to-violet-600 flex items-center justify-center mx-auto text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-semibold">Ask or Answer</h3>
                            <p className="text-muted-foreground">
                                Post anonymous questions or enable feedback mode to receive questions from others. Use AI suggestions for better replies.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-linear-to-br from-purple-600 to-violet-600 flex items-center justify-center mx-auto text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-semibold">Get Honest Feedback</h3>
                            <p className="text-muted-foreground">
                                Receive genuine, anonymous responses. All interactions are private and secure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <Card className="max-w-3xl mx-auto border-purple-500/30 bg-linear-to-br from-purple-500/10 to-violet-500/10">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl mb-4">
                                Ready to Get Started?
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Join AnonAsk today and start having honest, anonymous conversations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center gap-4 pt-4">
                            <Link href="/sign-up">
                                <Button size="lg" className="gradientBtn text-lg px-8">
                                    Create Free Account
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default Home
