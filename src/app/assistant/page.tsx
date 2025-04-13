import { getHumeAccessToken } from "@/lib/get-hume-access-token";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/voice-provider/wrapper-voice"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className={"grow flex flex-col"}>
      <Chat accessToken={accessToken} />
    </div>
  );
}

// 'use client'
// import { useState, useEffect } from 'react'
// import { Mic, Send, Loader2 } from 'lucide-react'

// export default function Assistant() {
//   const [question, setQuestion] = useState('')
//   const [answer, setAnswer] = useState('')
//   const [listening, setListening] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [history, setHistory] = useState<{ question: string; answer: string }[]>([])
// useEffect(() => {
//   const storedHistory = localStorage.getItem('chatHistory')
//   if (storedHistory) {
//     setHistory(JSON.parse(storedHistory))
//   }
// }, [])
//   const handleAsk = async () => {
//     if (!question.trim()) return
    
//     setLoading(true)
//     try {
//       const res = await fetch('/api/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ question }),
//       })
//       const data = await res.json()
//       setAnswer(data.answer)
//       const newHistory = [...history, { question, answer: data.answer }]
// setHistory(newHistory)
// localStorage.setItem('chatHistory', JSON.stringify(newHistory))
//       setQuestion('')
//     } catch (error) {
//       console.error('Error fetching answer:', error)
//       setAnswer('Sorry, I encountered a problem while processing your question.')
//     } finally {
//       setLoading(false)
//     }
//   }

  
//   // Function to render markdown-like content
//   const renderMarkdown = (text: any) => {
//     if (!text) return null;
    
//     // Split into paragraphs
//     return text.split('\n').map((paragraph:any, i:any) => {
//       // Handle headings (h1 to h4)
//       if (paragraph.startsWith('#### ')) {
//         return (
//           <h4 key={i} className="text-lg font-semibold mt-4 mb-2 text-blue-300">
//             {paragraph.replace('#### ', '')}
//           </h4>
//         );
//       } else if (paragraph.startsWith('### ')) {
//         return (
//           <h3 key={i} className="text-xl font-bold mt-5 mb-2 text-blue-200">
//             {paragraph.replace('### ', '')}
//           </h3>
//         );
//       } else if (paragraph.startsWith('## ')) {
//         return (
//           <h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-blue-100">
//             {paragraph.replace('## ', '')}
//           </h2>
//         );
//       } else if (paragraph.startsWith('# ')) {
//         return (
//           <h1 key={i} className="text-3xl font-bold mt-6 mb-3 text-blue-100">
//             {paragraph.replace('# ', '')}
//           </h1>
//         );
//       } else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
//         // Handle bullet points
//         return (
//           <li key={i} className="ml-5 mb-2 list-disc">
//             {paragraph.substring(2)}
//           </li>
//         );
//       } else if (paragraph === '---') {
//         // Handle horizontal rule
//         return <hr key={i} className="my-4 border-blue-800" />;
//       } else if (paragraph.trim() === '') {
//         // Handle empty lines
//         return <div key={i} className="h-2"></div>;
//       } else {
//         // Handle normal paragraph
//         // Process bold and italic within paragraphs
//         const processedText = paragraph
//           .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//           .replace(/\*(.*?)\*/g, '<em>$1</em>');
          
//         return (
//           <p key={i} className="mb-3" 
//              dangerouslySetInnerHTML={{ __html: processedText }}>
//           </p>
//         );
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl rounded-xl bg-gradient-to-b from-blue-950 to-blue-900 shadow-2xl p-6">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center">
//             <span className="text-blue-900 text-xl">💬</span>
//           </div>
//           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
//             EOR Assistant
//           </h1>
//         </div>
        
//         <div className="mb-6">
//           <div className="relative">
//             <textarea
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
             
//               placeholder="Ask about nanoparticles, IFT, wettability..."
//               className="w-full p-4 pr-24 bg-blue-950/50 border border-blue-800 rounded-xl text-blue-100 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
//             />
//             <div className="absolute bottom-3 right-3 flex gap-2">
//               <button
//                 disabled={listening}
//                 className={`p-2 rounded-full ${listening ? 'bg-green-600 animate-pulse' : 'bg-blue-700 hover:bg-blue-600'} transition-all`}
//                 aria-label="Use voice input"
//               >
//                 <Mic size={20} />
//               </button>
//               <button
//                 onClick={handleAsk}
//                 disabled={loading || !question.trim()}
//                 className={`p-2 rounded-full ${loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-500'} transition-all`}
//                 aria-label="Send question"
//               >
//                 {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
//               </button>
//             </div>
//           </div>
//           {listening && (
//             <div className="mt-2 text-sm text-blue-400 flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               Listening... speak now
//             </div>
//           )}
//         </div>
//         {history.length > 0 && (
//   <div className="mt-10">
//     <h3 className="text-xl font-semibold text-blue-200 mb-4">🕘 Conversation History</h3>
//     <ul className="space-y-4">
     
//     </ul>
//   </div>
// )}
// <div className='flex flex-col-reverse'>

//    {history.map((entry, index) => (
//      <li key={index} className="border my-1 border-blue-800 bg-blue-950/20 p-4 rounded-lg">
//           <p className="text-blue-300 font-medium mb-1">Q: {entry.question}</p>
//           <div className="text-blue-100">{renderMarkdown(entry.answer)}</div>
//         </li>
//       ))}
//       </div>
      
     
//         <div className="mt-8 text-center text-blue-400 text-xs">
//           Enhanced Oil Recovery (EOR) Knowledge Assistant • Powered by AI
//         </div>
//       </div>
      
//     </div>

    
//   )
// }