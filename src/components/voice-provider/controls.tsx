"use client"

import { useVoice } from "@humeai/voice-react"
import { Button } from "../ui/button"
import { Mic, MicOff, Phone } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Toggle } from "../ui/toggle"
import MicFFT from "./MicFFT"
import { cn } from "@/lib/utils"

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice()

  return (
    <div className="!h-full bg-red-500 w-full flex">
<div
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center z-50",
        "bg-gradient-to-t from-[#0A0F2C] via-[#0A0F2C]/80 to-transparent backdrop-blur-md"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="p-4 bg-[#0D1235]/90 border border-cyan-800/30 rounded-2xl shadow-xl flex items-center gap-4"
          >
            {/* Toggle Mic */}
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                isMuted ? unmute() : mute()
              }}
              className={cn(
                "rounded-full p-2 transition-colors",
                isMuted
                  ? "bg-[#1E2A54] text-[#8A8FA3] hover:bg-[#243160]"
                  : "bg-cyan-500 text-[#0A0F2C] hover:bg-cyan-400"
              )}
            >
              {isMuted ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Toggle>

            {/* Mic FFT */}
            <div className="relative grid h-10 w-48 shrink-0 grow-0 rounded-md bg-[#10173D] border border-cyan-800/20 shadow-inner overflow-hidden">
              <MicFFT fft={micFft} className="fill-cyan-400/80 animate-pulse" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent" />
            </div>

            {/* End Call Button */}
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-red-500/40 transition duration-200"
              whileTap={{ scale: 0.97 }}
              onClick={() => disconnect()}
            >
              <Phone className="w-4 h-4 opacity-70" strokeWidth={2} />
              <span>End Call</span>
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
    </div>
    
  )
}

// "use client";
// import { useVoice } from "@humeai/voice-react";
// import { Button } from "../ui/button";
// import { Mic, MicOff, Phone } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Toggle } from "../ui/toggle";
// import MicFFT from "./MicFFT";
// import { cn } from "@/lib/utils";

// export default function Controls() {
//   const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

//   return (
//     <div
//       className={
//         cn(
//           "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
//           "bg-gradient-to-t from-card via-card/90 to-card/0",
//         )
//       }

//     >
//       <AnimatePresence>
//         {status.value === "connected" ? (
//           <motion.div
//             initial={{
//               y: "100%",
//               opacity: 0,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//             }}
//             exit={{
//               y: "100%",
//               opacity: 0,
//             }}
//             className={
//               "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
//             }
//           >
//             <Toggle
//               pressed={!isMuted}
//               onPressedChange={() => {
//                 if (isMuted) {
//                   unmute();
//                 } else {
//                   mute();
//                 }
//               }}
//             >
//               {isMuted ? (
//                 <MicOff className={"size-4"} />
//               ) : (
//                 <Mic className={"size-4"} />
//               )}
//             </Toggle>

//             <div className={"relative grid h-8 w-48 shrink grow-0"}>
//               <MicFFT fft={micFft} className={"fill-current"} />
//             </div>

//             <Button
//               className={"flex items-center gap-1"}
//               onClick={() => {
//                 disconnect();
//               }}
//               variant={"destructive"}
//             >
//               <span>
//                 <Phone
//                   className={"size-4 opacity-50"}
//                   strokeWidth={2}
//                   stroke={"currentColor"}
//                 />
//               </span>
//               <span>End Call</span>
//             </Button>
//           </motion.div>
//         ) : null}
//       </AnimatePresence>
//     </div>
//   );
// }