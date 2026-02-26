'use client'

import { useState } from 'react'
import { Button } from '@workspace/ui/components/ui/button'
import { ParticleBackground } from '@workspace/ui/components/particle-background'
import { SandboxPreview } from '@workspace/ui/components/sandbox-preview'
import { generateResponse } from "@workspace/utils/inngest_send"

export default function Page() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [description, setDescription] = useState('');

  const handleGenerate = async () => {
    if (description.trim()) {

      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: description })
      })

      if (!response) return null;
      const project = await response.json();
      const userId = "123" //

      generateResponse(description, project.id, userId );
      setIsSandboxOpen(true);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 ">
        <div className="max-w-2xl">

          <h1 className="mb-3 text-center text-5xl font-light tracking-tight text-foreground">
            SketchUI
          </h1>

          <p className="mb-12 text-center text-base text-muted-foreground">
            Transform your ideas into beautiful designs
          </p>

          <h2 className="mb-4 text-3xl font-light text-foreground text-left">
            Describe your design
          </h2>

          <p className="mb-8 text-balance text-left text-muted-foreground">
            Enter a detailed description of the UI you want to create. Be as specific as
            possible.
          </p>

          <div className="mb-5 rounded-lg border border-border bg-card/30 p-4 backdrop-blur-sm">
            <textarea
              placeholder="Design a modern dashboard with charts, user profile section, and navigation menu..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20 w-full border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
            />
          </div>

          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground ml-2">{description.length} characters</p>
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!description.trim()}
              className="relative overflow-hidden px-8 py-3 rounded-sm mr-2 bg-[#FAFAFA] text-black transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed after:absolute after:inset-0
              after:bg-black/0 after:transition after:duration-300 hover:after:bg-black/10 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:skew-x-12 before:transition-all before:duration-500
              hover:before:left-[100%]"
            >
              Generate
            </Button>
          </div>

          <div className="text-left mb-7">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tips for better results
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-foreground">→</span>
                <span>Be specific about layout, colors, and components</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground">→</span>
                <span>Mention the purpose and target audience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground">→</span>
                <span>Include style preferences (modern, minimal, bold, etc.)</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-center px-4 py-4 text-sm text-muted-foreground">
          © 2026 SketchUI. All rights reserved.
        </div>
      </div>

      <SandboxPreview
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        description={description}
      />
    </div>
  )
}
