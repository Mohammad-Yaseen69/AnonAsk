import React from 'react'
import Link from 'next/link'
import { MessageSquare, Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-purple-500/20 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <MessageSquare className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="text-lg font-bold gradientText">AnonAsk</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Anonymous Q&A platform where you can ask questions and receive honest feedback with AI-powered suggestions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/sign-up" 
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link 
                  href="/sign-in" 
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Anonymous Questions</li>
              <li>AI Reply Suggestions</li>
              <li>Direct Feedback</li>
              <li>Privacy First</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-purple-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-purple-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-purple-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AnonAsk. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
