"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Loader2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LuBotMessageSquare } from "react-icons/lu"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [listening, setListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([])
  const historyContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory")
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  // This effect will now properly scroll to show the newest message
  useEffect(() => {
    if (historyContainerRef.current && history.length > 0) {
      // Scroll to the bottom since we're using flex-col-reverse
      // This ensures the newest message (which appears at the top visually) is in view
      historyContainerRef.current.scrollTop = 0
    }
  }, [history])

  const handleAsk = async () => {
    if (!question.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      
      // Save the new history item
      const newHistoryItem = { question, answer: data }
      const newHistory = [newHistoryItem, ...history]
      setHistory(newHistory)
      localStorage.setItem("chatHistory", JSON.stringify(newHistory))
      setAnswer(data)
      setQuestion("")
    } catch (error) {
      console.error("Error fetching answer:", error)
      setAnswer("Sorry, I encountered a problem while processing your question.")
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("chatHistory")
  }

  // Function to render markdown-like content
  const renderMarkdown = (text: any) => {
    if (!text) return null

    // Split into paragraphs
    return text.split("\n").map((paragraph: any, i: any) => {
      // Handle headings (h1 to h4)
      if (paragraph.startsWith("#### ")) {
        return (
          <h4 key={i} className="text-lg font-semibold mt-4 mb-2 text-blue-300">
            {paragraph.replace("#### ", "")}
          </h4>
        )
      } else if (paragraph.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-bold mt-5 mb-2 text-blue-200">
            {paragraph.replace("### ", "")}
          </h3>
        )
      } else if (paragraph.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-blue-100">
            {paragraph.replace("## ", "")}
          </h2>
        )
      } else if (paragraph.startsWith("# ")) {
        return (
          <h1 key={i} className="text-3xl font-bold mt-6 mb-3 text-blue-100">
            {paragraph.replace("# ", "")}
          </h1>
        )
      } else if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
        // Handle bullet points
        return (
          <li key={i} className="ml-5 mb-2 list-disc">
            {paragraph.substring(2)}
          </li>
        )
      } else if (paragraph === "---") {
        // Handle horizontal rule
        return <hr key={i} className="my-4 border-blue-800" />
      } else if (paragraph.trim() === "") {
        // Handle empty lines
        return <div key={i} className="h-2"></div>
      } else {
        // Handle normal paragraph
        // Process bold and italic within paragraphs
        const processedText = paragraph
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")

        return <p key={i} className="mb-3" dangerouslySetInnerHTML={{ __html: processedText }}></p>
      }
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative z-[100] flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 overflow-hidden",
          "bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600",
          "before:content-[''] before:absolute before:inset-0 before:bg-blue-400 before:opacity-0 before:rounded-full before:scale-0 before:transition-all before:duration-500",
          "hover:before:opacity-20 hover:before:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        )}
        aria-label="Open chat assistant"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] opacity-70"></div>
        <div className="relative z-10">
          {isOpen ? <X className="w-7 h-7 text-white" /> : <LuBotMessageSquare className="w-7 h-7 text-white" />}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-300 rounded-full animate-pulse"></div>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-[90vw] md:w-[450px] lg:w-[500px] bg-slate-900 rounded-lg shadow-xl border border-blue-800/30 overflow-hidden transition-all duration-300 transform origin-bottom-right">
          <CardHeader className="border-b border-blue-800/30 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-blue-950 text-xl">💬</span>
                </div>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                  EOR Assistant
                </CardTitle>
              </div>

              <TooltipProvider>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={clearHistory}
                          variant="ghost"
                          size="icon"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/50"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear chat history</p>
                      </TooltipContent>
                    </Tooltip>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 border-blue-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-blue-100">Clear Chat History</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-300">
                        This will permanently delete your entire conversation history. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearHistory}
                        className="bg-red-600 hover:bg-red-700 text-white border-none"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TooltipProvider>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
            <div className="relative mb-6 mt-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAsk()
                  }
                }}
                placeholder="Ask about nanoparticles, IFT, wettability..."
                className="w-full p-4 pr-24 bg-blue-950/30 border border-blue-800/50 rounded-xl text-blue-100 placeholder-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-24 transition-all shadow-inner"
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <Button
                  onClick={handleAsk}
                  disabled={loading || !question.trim()}
                  className={`rounded-full ${loading ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-500"} transition-all`}
                  aria-label="Send question"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </Button>
              </div>
            </div>

            {listening && (
              <div className="mt-2 text-sm text-blue-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Listening... speak now
              </div>
            )}

            {history.length > 0 ? (
              <div className="mt-6 space-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-blue-200">Conversation History</h3>
                </div>

                <div
                  ref={historyContainerRef}
                  className="space-y-4 flex flex-col gap-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar"
                >
                  {history.map((entry, index) => (
                    <div key={index} className="group">
                      <div className="border border-blue-800/30 bg-blue-950/20 p-4 rounded-lg hover:bg-blue-900/20 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-blue-300 font-medium">Q: {entry.question}</p>
                        </div>
                        <div className="text-blue-100 pl-2 border-l-2 border-blue-700/30">
                          {renderMarkdown(entry.answer)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                  <Send size={24} className="text-blue-400/50" />
                </div>
                <h3 className="text-xl font-medium text-blue-300 mb-2">No conversations yet</h3>
                <p className="text-blue-400/70 max-w-md">Ask a question about Enhanced Oil Recovery to get started</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t border-blue-800/30 pt-4 text-center text-blue-400/70 text-xs">
            Enhanced Oil Recovery (EOR) Knowledge Assistant • Powered by AI
          </CardFooter>
        </div>
      )}
    </div>
  )
}