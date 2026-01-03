'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { MessageSquare, LogOut, User } from 'lucide-react'

const Navbar = () => {
    const { data: session, status } = useSession()

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <MessageSquare className="h-7 w-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-colors" />
                        </div>
                        <span className="text-xl font-bold gradientText">AnonAsk</span>
                    </Link>


                    <div className="flex items-center gap-3">
                        {status === 'loading' ? (
                            <div className="h-9 w-20 animate-pulse bg-secondary rounded-md" />
                        ) : session ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="text-sm">{session.user?.username || 'Profile'}</span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="flex items-center gap-2 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/sign-in">
                                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/sign-up">
                                    <Button
                                        size="sm"
                                        className="gradientBtn rounded-md px-4"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
