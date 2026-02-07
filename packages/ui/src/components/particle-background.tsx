'use client'

import { useEffect, useRef } from 'react'

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }[] = []

    // Create particles
    const particleCount = Math.min(50, Math.max(20, (canvas.width * canvas.height) / 15000))
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -1
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -1
        }

        // Keep particles in bounds
        particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x))
        particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y))

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Fade opacity slightly
        particle.opacity += (Math.random() - 0.5) * 0.05
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity))
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particleI = particles[i]
          const particleJ = particles[j]
          if (!particleI || !particleJ) continue

          const dx = particleI.x - particleJ.x
          const dy = particleI.y - particleJ.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 100) * 0.1})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particleI.x, particleI.y)
            ctx.lineTo(particleJ.x, particleJ.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 100%)',
      }}
    />
  )
}
