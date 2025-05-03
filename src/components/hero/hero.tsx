"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Cpu, Atom, Brain, ChevronDown, ExternalLink, Droplet, Microscope, FlaskConical } from "lucide-react"
import { useIsMobile } from "../../../hooks/use-mobile"
import ClientComponent from "../voice-provider/wrapper-voice"
import { useRouter } from "next/navigation"

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
  const [data, setData] = useState<any>()

  const isMobile = useIsMobile()
const sections: Record<string, Section> = {
  innovation: {
    title: "Nano-Innovation in EOR",
    description: "Harnessing nanotechnology to enhance oil recovery through precision targeting and improved sweep efficiency.",
    icon: <FlaskConical className="w-16 h-16 text-yellow-400" />, // You may choose a better fitting icon
    color: "from-yellow-400 to-orange-600",
  },
  technology: {
    title: "Smart Nano-Formulations",
    description:
      "Engineering nanoparticles that alter reservoir wettability, reduce interfacial tension, and improve mobility control.",
    icon: <Microscope className="w-16 h-16 text-green-400" />,
    color: "from-green-400 to-lime-600",
  },
  potential: {
    title: "Transforming Reservoir Performance",
    description:
      "Unlocking residual oil, extending field life, and enabling cost-effective recovery in mature and tight formations.",
    icon: <Droplet className="w-16 h-16 text-blue-400" />,
    color: "from-blue-400 to-indigo-600",
  },
}

 const researchCards: ResearchCard[] = [
  {
    id: "nano-wettability",
    title: "Wettability Alteration",
    description: "Nanoparticles engineered to shift rock wettability toward water-wet conditions for better oil displacement.",
    color: "from-orange-500 to-yellow-700",
  },
  {
    id: "nano-emulsion",
    title: "Nano-Emulsions for Mobility",
    description: "Stabilized nano-emulsions that reduce interfacial tension and enhance mobility of trapped oil.",
    color: "from-lime-500 to-green-700",
  },
  {
    id: "smart-nano-tracers",
    title: "Smart Nano-Tracers",
    description: "Intelligent nanoparticles for real-time reservoir monitoring and enhanced sweep diagnostics.",
    color: "from-blue-500 to-indigo-700",
  },
]
const nanoData = {
  innovation: [
    { phase: "Initial", wettability: 0.3 },
    { phase: "After Nano-EOR", wettability: 0.7 },
  ],
  technology: [
    { time: "Day 1", ift: 30 },
    { time: "Day 2", ift: 20 },
    { time: "Day 3", ift: 10 },
    { time: "Day 4", ift: 5 },
  ],
  potential: [
    { month: "Jan", recovery: 28 },
    { month: "Feb", recovery: 32 },
    { month: "Mar", recovery: 37 },
    { month: "Apr", recovery: 42 },
  ]
}
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
      const fontSize = isMobile ? 70: Math.min(120, canvas.width / 10)
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
      const density = Math.max(1, Math.floor(canvas.width / (isMobile ? 100 : 180)))

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
    const mouse: Mouse = { x: null, y: null, radius: isMobile? 40 : 100 }
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
          setData([
    { phase: "Initial", wettability: 0.3 },
    { phase: "After Nano-EOR", wettability: 0.7 },
  ])
      } else if (activeSection === "technology") {
        bgGradient.addColorStop(0, "rgba(0, 80, 60, 0.2)")
        bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
         setData([
    { time: "Day 1", ift: 30 },
    { time: "Day 2", ift: 20 },
    { time: "Day 3", ift: 10 },
    { time: "Day 4", ift: 5 },
  ])
      } else if (activeSection === "potential") {
        bgGradient.addColorStop(0, "rgba(50, 0, 100, 0.2)")
        bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
          setData([
    { month: "Jan", recovery: 28 },
    { month: "Feb", recovery: 32 },
    { month: "Mar", recovery: 37 },
    { month: "Apr", recovery: 42 },
  ])
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
    const router = useRouter()
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-20" style={getParallaxStyle(-0.01)}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      {/* Particle canvas */}
    {isMobile ?("") : (<canvas ref={particleCanvasRef} className="absolute inset-0 z-0 opacity-70" />) }  

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

       
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/zeyad-deeban-866291203"
            className="px-4 py-2 rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/30"
          >
            Connect
          </motion.a>
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
              Exploring the intersection of nano technology and reservoir engineering to redefine the boundaries of Enhanced Oil Recovery.
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
                        <h3 className="text-xl font-bold">{section.title}hh</h3>
                        <p className="text-gray-300 text-sm">{section.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                // onClick={() => setIsExploring(!isExploring)}
                className="
                  flex items-center space-x-3 
                  bg-gradient-to-r from-cyan-500 to-blue-600 
                  px-6 py-3 rounded-full 
                  text-white font-bold text-lg
                  hover:shadow-xl hover:shadow-cyan-500/30
                  transition-all duration-300
                "
                onClick={() => {router.push('https://drive.google.com/file/d/1Nr731rd4TceMUS_HlczgyFBU3MNkpA3Z/view?usp=sharing')}}
                
              >

                <span>Explore Research</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              // initial={{ opacity: 0, x: 50 }}
              // animate={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, delay: 0.2 }}
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

              
              
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          {/* <motion.div
            className="absolute bottom-8 xl:left-[46%] left-[42%] transform flex flex-col items-center"
            // animate={{
            //   y: [0, 10, 0],
            //   opacity: [0.5, 1, 0.5],
            // }}
            // transition={{
            //   duration: 2,
            //   repeat: Number.POSITIVE_INFINITY,
            //   repeatType: "reverse",
            // }}
          >
            <p className="text-gray-400 text-center text-sm mb-2">Scroll to explore</p>
            <ChevronDown className="w-6 h-6 text-cyan-400" />
          </motion.div> */}
        </section>

        {/* Research section (conditionally rendered) */}
       
      </main>
    </div>
  )
}