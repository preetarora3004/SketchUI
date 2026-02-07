'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/ui/button'
import { Input } from '@workspace/ui/components/ui/input'
import { Label } from '@workspace/ui/components/ui/label'
import { ParticleBackground } from '@workspace/ui/components/particle-background'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      alert('Sign in successful!')
    }, 1500)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="mb-6 inline-block text-4xl font-light tracking-tight text-foreground"
            >
              SketchUI
            </Link>
            <p className="text-balance text-sm text-muted-foreground">
              Welcome back to your creative workspace
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-lg border border-border bg-card/50 p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-input text-foreground accent-primary"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm text-muted-foreground"
                >
                  Remember me
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </Button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-foreground hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
