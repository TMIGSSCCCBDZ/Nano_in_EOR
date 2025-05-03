"use client"

import { useVoice } from "@humeai/voice-react"
import { AnimatePresence, motion } from "framer-motion"
import { Phone } from "lucide-react"
import { useState } from "react"

export default function StartCall() {
  const { status, connect } = useVoice()
  const [isHovering, setIsHovering] = useState(false)

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at center, #0A0F2C 0%, #060B23 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated Neon Grid Background */}
          <div className="absolute inset-0 bg-animated-grid opacity-10 pointer-events-none" />

          {/* Main content container */}
          <motion.div
            className="relative z-10 w-full max-w-md px-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {/* Futuristic Logo */}
            <div className="mb-12 text-center">
              <motion.div
                className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-glow border border-cyan-400/20 shadow-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-cyan-400 text-2xl font-bold tracking-widest">AI</div>
              </motion.div>
              <h1 className="text-2xl font-semibold text-white mt-3">NanoEOR Voice Link</h1>
              <p className="text-[#8A8FA3] text-sm max-w-xs mx-auto mt-2">
                Converse with your AI on cutting-edge nanotech in Enhanced Oil Recovery
              </p>
            </div>

            {/* Call Card */}
            <motion.div
              className="bg-[#0D1235]/90 border border-cyan-800/30 rounded-2xl p-6 shadow-xl backdrop-blur-md"
              whileHover={{
                boxShadow: "0 10px 30px rgba(0, 207, 253, 0.2)",
                y: -2,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-lg font-semibold">AI is Standing By</h2>
                  <p className="text-[#8A8FA3] text-sm">Encrypted Voice Transmission</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#161F4A] flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
              </div>

              {/* Secure connection badge */}
              <div className="flex items-center gap-3 py-4 border-y border-[#1A2352]">
                <div className="h-10 w-10 rounded-full bg-[#161F4A] flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-[#0D1235] flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-cyan-400"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[#8A8FA3] text-xs">AI–Human Encrypted Interface</p>
                </div>
              </div>

              {/* Start Call Button */}
              <div className="mt-6">
                <motion.button
                  className="w-full py-4 rounded-xl relative overflow-hidden shadow-lg"
                  style={{
                    background: isHovering
                      ? "linear-gradient(90deg, #00CFFD 0%, #00A3FF 100%)"
                      : "linear-gradient(90deg, #00CFFD 0%, #00A3FF 100%)",
                    opacity: isHovering ? 1 : 0.9,
                }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  onClick={() => {
                    connect()
                      .then(() => {})
                      .catch(() => {})
                      .finally(() => {})
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    initial={{ x: -300 }}
                    animate={isHovering ? { x: 400 } : { x: -300 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />

                  <div className="relative flex items-center justify-center gap-2 z-10">
                    <div className="bg-white bg-opacity-20 rounded-full p-1.5 backdrop-blur-sm">
                      <Phone className="h-4 w-4 text-[#0A0F2C]" strokeWidth={2} />
                    </div>
                    <span className="font-semibold text-[#0A0F2C]">Initiate AI Call</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Footer Info */}
              
          </motion.div>

          {/* Bottom Accent Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00CFFD] via-[#00A3FF] to-[#00CFFD]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

// Custom styles for background
const styles = `
.bg-animated-grid {
  background-image: 
    linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  animation: gridmove 10s linear infinite;
}

.bg-glow {
  background: radial-gradient(circle at center, #00CFFD20, #00CFFD05);
  box-shadow: 0 0 15px #00CFFD55;
}

@keyframes gridmove {
  0% { background-position: 0 0; }
  100% { background-position: 24px 24px; }
}
`

// Inject styles into document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style")
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}



// import { useVoice } from "@humeai/voice-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Button } from "../ui/button";
// import { Phone } from "lucide-react";

// export default function StartCall() {
//   const { status, connect } = useVoice();

//   return (
//     <AnimatePresence>
//       {status.value !== "connected" ? (
//         <motion.div
//           className={"fixed inset-0 p-4 flex items-center justify-center bg-background"}
//           initial="initial"
//           animate="enter"
//           exit="exit"
//           variants={{
//             initial: { opacity: 0 },
//             enter: { opacity: 1 },
//             exit: { opacity: 0 },
//           }}
//         >
//           <AnimatePresence>
//             <motion.div
//               variants={{
//                 initial: { scale: 0.5 },
//                 enter: { scale: 1 },
//                 exit: { scale: 0.5 },
//               }}
//             >
//               <Button
//                 className={"z-50 flex items-center gap-1.5"}
//                 onClick={() => {
//                   connect()
//                     .then(() => {})
//                     .catch(() => {})
//                     .finally(() => {});
//                 }}
//               >
//                 <span>
//                   <Phone
//                     className={"size-4 opacity-50"}
//                     strokeWidth={2}
//                     stroke={"currentColor"}
//                   />
//                 </span>
//                 <span>Start Call</span>
//               </Button>
//             </motion.div>
//           </AnimatePresence>
//         </motion.div>
//       ) : null}
//     </AnimatePresence>
//   );
// }
