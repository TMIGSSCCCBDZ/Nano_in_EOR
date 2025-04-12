"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import QuantumMindsLandingPage from "@/components/hero/hero"
import EORShowcase from "@/components/showcase/showcase"
import EORComparisonVisualizations from "@/components/visualization/visualization"
import TeamNetwork from "@/components/team/team"
import { LuBotMessageSquare } from "react-icons/lu";
import ChatButton from "@/components/chat-button/chat-button"
import AbstractFooter from "@/components/footer/footer"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadingPercentage, setLoadingPercentage] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {loading ? (
        <motion.div
          className="flex flex-col items-center justify-center h-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: loadingPercentage === 100 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center gap-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Image className="animate-pulse"  src="/logo.png" alt="Nano Logo" width={250} height={100} priority />
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl font-bold"
              >
                {loadingPercentage}%
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-lg"
              >
                Loading your experience.
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : (
       <div>
        <ChatButton />
      <QuantumMindsLandingPage />
      <EORShowcase />
      <EORComparisonVisualizations />
      <TeamNetwork />
      <AbstractFooter />
    </div>
      )}

      <div className="absolute bottom-4 left-4">
      </div>
    </main>
  )
}


