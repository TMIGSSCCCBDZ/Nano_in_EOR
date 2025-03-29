"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Cpu, Atom, Brain, ChevronDown, ExternalLink } from "lucide-react"

interface Section {
  title: string
  description: string
  icon: JSX.Element
  color: string
}

interface ResearchCard {
  id: string
  title: string
  description: string
  color: string
}

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  dx: number
  dy: number
  friction: number
  energy: number
  color: {
    r: number
    g: number
    b: number
  }
  lifespan: number
  maxSize: number
  update: (mouse: Mouse, activeSection: string) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

interface Mouse {
  x: number | null
  y: number | null
  radius: number
}

export default function QuantumMindsLandingPage() {
  const [activeSection, setActiveSection] = useState<string>("innovation")
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [scrollY, setScrollY] = useState<number>(0)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isExploring, setIsExploring] = useState<boolean>(false)
  const [hoverCard, setHoverCard] = useState<string | null>(null)

  const sections: Record<string, Section> = {
    innovation: {
      title: "Where Quantum Meets Imagination",
      description: "Pushing the boundaries of scientific understanding through revolutionary computational paradigms.",
      icon: <Atom className="w-16 h-16 text-cyan-400" />,
      color: "from-cyan-400 to-blue-600",
    },
    technology: {
      title: "Computational Frontiers Redefined",
      description:
        "Breakthrough algorithms that simulate the intricate dance of quantum particles and neural networks.",
      icon: <Cpu className="w-16 h-16 text-emerald-400" />,
      color: "from-emerald-400 to-teal-600",
    },
    potential: {
      title: "Unlocking Human Cognitive Potential",
      description: "Transforming how we understand intelligence, consciousness, and the fundamental fabric of reality.",
      icon: <Brain className="w-16 h-16 text-indigo-400" />,
      color: "from-indigo-400 to-purple-600",
    },
  }

  const researchCards: ResearchCard[] = [
    {
      id: "quantum-neural",
      title: "Quantum Neural Networks",
      description: "Hybrid systems that leverage quantum computing principles to enhance neural network capabilities.",
      color: "from-cyan-500 to-blue-700",
    },
    {
      id: "consciousness",
      title: "Consciousness Simulation",
      description: "Exploring the boundaries between artificial intelligence and human consciousness.",
      color: "from-purple-500 to-pink-700",
    },
    {
      id: "quantum-algorithms",
      title: "Novel Quantum Algorithms",
      description: "Developing new computational approaches that harness quantum mechanical phenomena.",
      color: "from-emerald-500 to-green-700",
    },
  ]

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ensure canvas is the full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial resize
    resizeCanvas()

    // Add resize listener
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class ParticleClass implements Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      dx: number
      dy: number
      friction: number
      energy: number
      color: {
        r: number
        g: number
        b: number
      }
      lifespan: number
      maxSize: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = 2
        this.dx = 0
        this.dy = 0
        this.friction = 0.95
        this.energy = Math.random()
        this.color = {
          r: 57 + Math.random() * 50,
          g: 200 + Math.random() * 55,
          b: 220 + Math.random() * 35,
        }
        this.lifespan = 0.7 + Math.random() * 0.3
        this.maxSize = 2 + Math.random() * 3
      }

      update(mouse: Mouse, activeSection: string) {
        // Apply section-specific color variations
        if (activeSection === "innovation") {
          this.color = {
            r: 57 + Math.random() * 50,
            g: 200 + Math.random() * 55,
            b: 220 + Math.random() * 35,
          }
        } else if (activeSection === "technology") {
          this.color = {
            r: 57 + Math.random() * 30,
            g: 220 + Math.random() * 35,
            b: 180 + Math.random() * 40,
          }
        } else if (activeSection === "potential") {
          this.color = {
            r: 120 + Math.random() * 40,
            g: 100 + Math.random() * 55,
            b: 220 + Math.random() * 35,
          }
        }

        const dx = this.x - (mouse.x || 0)
        const dy = this.y - (mouse.y || 0)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouse.radius - distance) / mouse.radius
          const repelX = Math.cos(angle) * force * 40 * this.energy
          const repelY = Math.sin(angle) * force * 40 * this.energy

          this.dx += repelX
          this.dy += repelY
        }

        // Add some random movement
        this.dx += (Math.random() - 0.5) * 0.3 * this.energy
        this.dy += (Math.random() - 0.5) * 0.3 * this.energy

        this.dx *= this.friction
        this.dy *= this.friction

        this.x += this.dx
        this.y += this.dy

        const dxBase = this.baseX - this.x
        const dyBase = this.baseY - this.y
        const distanceBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase)
        if (distanceBase > 0.1) {
          this.x += dxBase * (0.05 * this.energy)
          this.y += dyBase * (0.05 * this.energy)
        }

        // Pulse size
        this.size = this.maxSize * (0.8 + Math.sin(Date.now() * 0.003 * this.energy) * 0.2)
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)

        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.energy * this.lifespan})`,
        )
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * (1.5 + this.energy), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles from text
    const createParticles = () => {
      // Ensure canvas is cleared and text is drawn
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set up text properties
      const text = "Nano in EOR"
      const fontSize = Math.min(120, canvas.width / 10)
      ctx.font = `bold ${fontSize}px 'Inter', sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Draw text
      ctx.fillStyle = "white"
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)

      // Extract particle positions
      const particleArray: Particle[] = []
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Adjust density based on screen size
      const density = Math.max(1, Math.floor(canvas.width / 180))

      for (let y = 0; y < canvas.height; y += density) {
        for (let x = 0; x < canvas.width; x += density) {
          const index = (y * canvas.width + x) * 4
          const alpha = data[index + 3]

          if (alpha > 128) {
            particleArray.push(new ParticleClass(x, y))
          }
        }
      }

      // Add some random particles for background effect
      for (let i = 0; i < (canvas.width * canvas.height) / 10000; i++) {
        particleArray.push(new ParticleClass(Math.random() * canvas.width, Math.random() * canvas.height))
      }

      return particleArray
    }

    // Create initial particle array
    const particleList = createParticles()

    // Mouse tracking
    const mouse: Mouse = { x: null, y: null, radius: 100 }
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add a subtle background glow
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5,
      )

      // Change background color based on active section
      if (activeSection === "innovation") {
        bgGradient.addColorStop(0, "rgba(0, 50, 100, 0.2)")
        bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      } else if (activeSection === "technology") {
        bgGradient.addColorStop(0, "rgba(0, 80, 60, 0.2)")
        bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      } else if (activeSection === "potential") {
        bgGradient.addColorStop(0, "rgba(50, 0, 100, 0.2)")
        bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      }

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particleList.forEach((particle) => {
        particle.update(mouse, activeSection)
        particle.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener("mousemove", onMouseMove)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [activeSection])

  // Parallax effect for background elements
  const getParallaxStyle = (factor: number) => {
    return {
      transform: `translate(${cursorPosition.x * factor}px, ${cursorPosition.y * factor}px)`,
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20" style={getParallaxStyle(-0.01)}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      {/* Particle canvas */}
      <canvas ref={particleCanvasRef} className="absolute inset-0 z-0 opacity-70" />

      {/* Custom cursor effect */}
      <div
        className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-screen bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 blur-sm"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      {/* Header */}
      <header className="relative z-10 w-full py-6 px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center"
        >
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Nano Tech
          </div>

          <nav className="hidden md:flex space-x-8">
            {["Research", "Technology", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white relative"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => {
                  const audio = new Audio("/hover.mp3")
                  audio.volume = 0.1
                  audio.play().catch(() => {})
                }}
              >
                {item}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/30"
          >
            Connect
          </motion.button>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero section */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Nano in EOR
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Exploring the intersection of quantum computing and cognitive science to redefine the boundaries of
                human potential.
              </motion.p>

              <div className="space-y-4">
                {Object.entries(sections).map(([key, section], index) => (
                  <motion.div
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`
                      cursor-pointer p-4 rounded-xl transition-all duration-300 
                      ${
                        activeSection === key
                          ? `bg-gradient-to-r ${section.color} bg-opacity-20 border-l-4 border-cyan-400`
                          : "bg-gray-800/40 hover:bg-gray-800/60 border-l-4 border-transparent"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div>
                        {section.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{section.title}</h3>
                        <p className="text-gray-300 text-sm">{section.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setIsExploring(!isExploring)}
                className="
                  flex items-center space-x-3 
                  bg-gradient-to-r from-cyan-500 to-blue-600 
                  px-6 py-3 rounded-full 
                  text-white font-bold text-lg
                  hover:shadow-xl hover:shadow-cyan-500/30
                  transition-all duration-300
                "
              >
                <span>Explore Research</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/30 rounded-3xl border border-cyan-500/30 backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 20px 0 rgba(56, 189, 248, 0.3)",
                    "0 0 60px 0 rgba(56, 189, 248, 0.2)",
                    "0 0 20px 0 rgba(56, 189, 248, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <div className="relative p-8 z-10">
                <motion.div className="text-center">
                  <motion.div key={activeSection}>
                    <div className="flex justify-center mb-6">{sections[activeSection].icon}</div>
                    <h2
                      className={`text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${sections[activeSection].color}`}
                    >
                      {sections[activeSection].title}
                    </h2>
                    <p className="text-gray-300">{sections[activeSection].description}</p>
                  </motion.div>
                </motion.div>

                {/* Interactive visualization */}
                <div className="mt-8 h-48 relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-cyan-300 mb-2">Interactive Visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 xl:left-[46%] left-[44%] transform flex flex-col items-center"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <p className="text-gray-400 text-center text-sm mb-2">Scroll to explore</p>
            <ChevronDown className="w-6 h-6 text-cyan-400" />
          </motion.div>
        </section>

        {/* Research section (conditionally rendered) */}
        <AnimatePresence>
          {isExploring && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="py-20 bg-gradient-to-b from-transparent to-gray-900/80 backdrop-blur-sm"
            >
              <div className="container mx-auto px-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
                >
                  Current Research
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {researchCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.2 },
                      }}
                      onMouseEnter={() => setHoverCard(card.id)}
                      onMouseLeave={() => setHoverCard(null)}
                      className="relative rounded-xl overflow-hidden group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-80`}></div>

                      {/* Animated background particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white/30"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative p-6 h-full flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-white">{card.title}</h3>
                        <p className="text-white/80 mb-4">{card.description}</p>

                        <motion.div
                          className="mt-auto flex items-center text-white/90"
                          animate={{
                            x: hoverCard === card.id ? 5 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="mr-2">Learn more</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}