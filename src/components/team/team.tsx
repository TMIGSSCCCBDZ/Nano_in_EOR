"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Define team member type
type TeamMember = {
  id: number
  name: string
  role: string
  image: string
}

export default function TeamNetwork() {
  // Sample team data
  const teamMembers: TeamMember[] = [
    { id: 1, name: "Dr. Alex Chen", role: "Lead Researcher", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Dr. Sarah Johnson", role: "Molecular Engineer", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Prof. Michael Lee", role: "Quantum Physicist", image: "/placeholder.svg?height=200&width=200" },
    {
      id: 4,
      name: "Dr. Emily Rodriguez",
      role: "Nanotechnology Specialist",
      image: "/placeholder.svg?height=200&width=200",
    },
    { id: 5, name: "Dr. James Wilson", role: "Data Scientist", image: "/placeholder.svg?height=200&width=200" },
    { id: 6, name: "Dr. Lisa Park", role: "Biomedical Engineer", image: "/placeholder.svg?height=200&width=200" },
  ]

  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>([])
  const animationRef = useRef<number>(0)
  const pulseTimeRef = useRef(0)

  // Calculate positions for team members in a circular layout
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })

      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.35

      // Position nodes in a perfect circle
      const positions = teamMembers.map((_, index) => {
        const angle = (index / teamMembers.length) * Math.PI * 2
        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        }
      })

      setNodePositions(positions)
    }
  }, [teamMembers.length, dimensions.width, dimensions.height])

  // Draw the network connections
  useEffect(() => {
    if (!canvasRef.current || nodePositions.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match container
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Animation function
    const animate = (time: number) => {
      pulseTimeRef.current = time * 0.001 // Convert to seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between all nodes
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const startNode = nodePositions[i]
          const endNode = nodePositions[j]

          // Calculate distance for connection opacity
          const dx = endNode.x - startNode.x
          const dy = endNode.y - startNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only connect nodes that are within a reasonable distance
          if (distance < dimensions.width * 0.5) {
            const isHighlighted = hoveredMember === i + 1 || hoveredMember === j + 1

            // Draw the connection
            drawConnection(ctx, startNode.x, startNode.y, endNode.x, endNode.y, isHighlighted, pulseTimeRef.current)
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, nodePositions, hoveredMember])

  // Draw a connection between two nodes with pulse effect
  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    isHighlighted: boolean,
    time: number,
  ) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Create gradient for the connection
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2)

    // Pulse effect - moving gradient along the line
    const pulseSpeed = 1.5
    const pulseWidth = 0.1
    const pulsePosition = ((time * pulseSpeed) % (1 + pulseWidth * 2)) - pulseWidth

    gradient.addColorStop(Math.max(0, pulsePosition - pulseWidth), "rgba(0, 210, 255, 0.1)")
    gradient.addColorStop(Math.max(0, Math.min(1, pulsePosition)), "rgba(0, 210, 255, 0.8)")
    gradient.addColorStop(Math.min(1, pulsePosition + pulseWidth), "rgba(0, 210, 255, 0.1)")

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = isHighlighted ? 2 : 1
    ctx.strokeStyle = gradient
    ctx.stroke()

    // Add glow effect for highlighted connections
    if (isHighlighted) {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.lineWidth = 4
      ctx.strokeStyle = "rgba(0, 210, 255, 0.2)"
      ctx.stroke()
    }
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener("resize", handleResize)
    
    // Initial sizing
    handleResize()
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">Our Research Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A collaborative network of experts pushing the boundaries of nanotechnology and molecular engineering.
          </p>
        </div>

        <div ref={containerRef} className="relative w-full h-[600px] mb-12">
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {nodePositions.map((position, index) => (
            <div
              key={teamMembers[index].id}
              className={`absolute z-10 transition-all duration-300 ${
                hoveredMember === teamMembers[index].id ? "scale-110" : ""
              }`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredMember(teamMembers[index].id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative">
                <div
                  className={`
                  w-[100px] h-[100px] rounded-full overflow-hidden border-2
                  ${
                    hoveredMember === teamMembers[index].id
                      ? "border-cyan-400 shadow-lg shadow-cyan-500/50"
                      : "border-cyan-800"
                  }
                `}
                >
                  <Image
                    src={teamMembers[index].image || "/placeholder.svg"}
                    alt={teamMembers[index].name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>

                {/* Glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-full 
                  ${hoveredMember === teamMembers[index].id ? "bg-cyan-500/20 blur-md" : "bg-transparent"}
                `}
                ></div>

                {/* Info card */}
                <div
                  className={`
                  absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                  bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 w-[160px]
                  border border-cyan-800 shadow-lg
                  transition-all duration-300
                  ${
                    hoveredMember === teamMembers[index].id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }
                  z-20
                `}
                >
                  <p className="font-semibold text-cyan-400">{teamMembers[index].name}</p>
                  <p className="text-xs text-gray-300">{teamMembers[index].role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">Hover over team members to see their connections and details</p>
        </div>
      </div>
    </div>
  )
}