'use client'

import { Button } from './ui/button'
import { X } from 'lucide-react'

interface SandboxPreviewProps {
  isOpen: boolean
  onClose: () => void
  description: string
}

export function SandboxPreview({ isOpen, onClose, description }: SandboxPreviewProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm">
      {/* Left Panel - Description */}
      <div className="w-1/3 overflow-y-auto border-r border-border bg-background p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Design Brief</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <div className="rounded-lg border border-border bg-card/30 p-4 backdrop-blur-sm">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
            {description || 'No description provided'}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
          >
            Edit
          </Button>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Regenerate
          </Button>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1 overflow-hidden bg-background/50">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border bg-background/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Preview</h3>
              <div className="flex items-center gap-2">
                <select className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary">
                  <option>Desktop</option>
                  <option>Tablet</option>
                  <option>Mobile</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sandbox Area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="h-full rounded-lg border border-border bg-white">
              <div className="flex h-full items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-block rounded-lg bg-gradient-to-br from-primary to-primary/60 p-12 mb-4">
                    <div className="text-6xl font-light text-white">✨</div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Your design is being created
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our AI is generating your custom UI design based on your description.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200 mx-auto">
                      <div className="h-full w-1/3 animate-pulse bg-primary rounded-full" />
                    </div>
                    <p className="text-xs text-gray-500">Generating...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
