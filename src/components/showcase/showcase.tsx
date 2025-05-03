"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Beaker, Wind, Info } from "lucide-react"

export default function EORShowcase() {
  const [activeMethod, setActiveMethod] = useState<"nano" | "co2" | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState({
    nano: false,
    co2: false
  })
  
  const nanoVideoRef = useRef<HTMLVideoElement>(null)
  const co2VideoRef = useRef<HTMLVideoElement>(null)

  const handleMethodChange = (method: "nano" | "co2") => {
    if (method === activeMethod || isTransitioning) return

    setIsTransitioning(true)
    
    // If we already have an active method, fade it out first
    if (activeMethod) {
      setTimeout(() => {
        setActiveMethod(method)
        setTimeout(() => setIsTransitioning(false), 500)
      }, 500)
    } else {
      // If no active method, transition directly
      setActiveMethod(method)
      setTimeout(() => setIsTransitioning(false), 500)
    }
    
    // Prepare the video for playback
    if (method === "nano" && nanoVideoRef.current) {
      nanoVideoRef.current.currentTime = 0
      nanoVideoRef.current.play()
    } else if (method === "co2" && co2VideoRef.current) {
      co2VideoRef.current.currentTime = 0
      co2VideoRef.current.play()
    }
  }

  // Preload videos and set up event listeners when component mounts
  useEffect(() => {
    // Function to handle video load events
    const handleNanoVideoLoaded = () => setVideosLoaded(prev => ({ ...prev, nano: true }))
    const handleCO2VideoLoaded = () => setVideosLoaded(prev => ({ ...prev, co2: true }))
    
    // Add event listeners to video elements
    if (nanoVideoRef.current) {
      if (nanoVideoRef.current.readyState >= 3) {
        handleNanoVideoLoaded()
      } else {
        nanoVideoRef.current.addEventListener('canplay', handleNanoVideoLoaded)
      }
    }
    
    if (co2VideoRef.current) {
      if (co2VideoRef.current.readyState >= 3) {
        handleCO2VideoLoaded()
      } else {
        co2VideoRef.current.addEventListener('canplay', handleCO2VideoLoaded)
      }
    }

    // Preload poster images
    const nanoImage = new Image()
    nanoImage.src = "https://uh.edu/nsm/_images/phys/news-events/2021/20210423-oil-recovery.jpg"
    
    const co2Image = new Image()
    co2Image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVO947VRAo1kek8qIYLre0bIz7sfkiNdP_Q&s"
    
    // Clean up event listeners
    return () => {
      if (nanoVideoRef.current) {
        nanoVideoRef.current.removeEventListener('canplay', handleNanoVideoLoaded)
      }
      if (co2VideoRef.current) {
        co2VideoRef.current.removeEventListener('canplay', handleCO2VideoLoaded)
      }
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background Layer - Always keep videos in DOM but control visibility */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Nano EOR Video - Always in DOM but conditionally visible */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${activeMethod === "nano" ? "opacity-100" : "opacity-0"}`}>
          <video
            ref={nanoVideoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="https://uh.edu/nsm/_images/phys/news-events/2021/20210423-oil-recovery.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/Super-IOR%20new%20generation%20of%20nano%20chemical%20for%20EOR%20(English%20Version).mp4?alt=media&token=eb801fb3-5a7c-41e8-94d4-40627ce1a4cf" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* CO2 Injection Video - Always in DOM but conditionally visible */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${activeMethod === "co2" ? "opacity-100" : "opacity-0"}`}>
          <video
            ref={co2VideoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVO947VRAo1kek8qIYLre0bIz7sfkiNdP_Q&s"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/CO2%20Enhanced%20Oil%20Recovery.mp4?alt=media&token=e3f17365-2e5b-4e02-b649-d2ff22fb97ee" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Animated particles background for scientific feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Enhanced Oil Recovery Technologies
          </h2>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto">
            Explore cutting-edge methods revolutionizing the energy industry through advanced extraction techniques.
          </p>
        </motion.div>

        {/* Buttons with loading indicator */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <Button
            variant={activeMethod === "nano" ? "default" : "outline"}
            size="lg"
            className={`text-lg px-8 py-6 transition-all duration-300 ${
              activeMethod === "nano"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm border-white/20"
            } relative overflow-hidden`}
            onClick={() => handleMethodChange("nano")}
            disabled={isTransitioning || !videosLoaded.nano}
          >
            <Beaker className="mr-2 h-5 w-5" />
            Nano EOR
            {!videosLoaded.nano && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                Loading...
              </span>
            )}
          </Button>

          <Button
            variant={activeMethod === "co2" ? "default" : "outline"}
            size="lg"
            className={`text-lg px-8 py-6 transition-all duration-300 ${
              activeMethod === "co2"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm border-white/20"
            } relative overflow-hidden`}
            onClick={() => handleMethodChange("co2")}
            disabled={isTransitioning || !videosLoaded.co2}
          >
            <Wind className="mr-2 h-5 w-5" />
            CO₂ Injection
            {!videosLoaded.co2 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                Loading...
              </span>
            )}
          </Button>
        </div>

        {/* Content Cards */}
        <AnimatePresence mode="wait">
          {activeMethod === "nano" && !isTransitioning && (
            <motion.div
              key="nano-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 max-w-3xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Beaker className="mr-3 h-6 w-6 text-primary" />
                Nano Enhanced Oil Recovery
              </h3>
              <p className="text-slate-200 mb-4">
                Nanotechnology in EOR utilizes engineered nanoparticles to modify fluid properties, reduce interfacial
                tension, and alter wettability at the molecular level. This cutting-edge approach significantly improves
                oil displacement efficiency in reservoirs previously considered depleted.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center text-xs text-slate-400">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Recovery increase: 15-25%</span>
                </div>
                <div className="flex-grow"></div>
              </div>
            </motion.div>
          )}

          {activeMethod === "co2" && !isTransitioning && (
            <motion.div
              key="co2-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 max-w-3xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Wind className="mr-3 h-6 w-6 text-primary" />
                CO₂ Injection Technology
              </h3>
              <p className="text-slate-200 mb-4">
                CO₂ injection represents a dual-benefit approach to energy production, combining enhanced oil recovery
                with carbon sequestration. When injected into reservoirs, supercritical CO₂ reduces oil viscosity and
                expands the oil, facilitating improved flow while permanently storing greenhouse gases underground.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center text-xs text-slate-400">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Carbon offset: ~0.6 tonnes CO₂/barrel</span>
                </div>
                <div className="flex-grow"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}