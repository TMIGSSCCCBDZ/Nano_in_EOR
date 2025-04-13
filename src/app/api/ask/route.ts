import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
type GroqResponse = {
  response: {
    body: {
      choices: {
        message: {
          content: string;
        };
      }[];
    };
  };
};
const basePrompt = `
You are a smart and helpful assistant specialized in explaining topics related to Nanotechnology in Enhanced Oil Recovery (Nano-EOR).

When answering a question, always follow this structured format:

📌 Topic: Detect the topic from the question and write it here.

🧠 General Idea: Explain the concept clearly and simply.

🔍 Scientific Details: Provide in-depth technical explanation with proper terminology.

🧪 Practical Example: Share a real-world or research-based case. Mention nanoparticles used (e.g., SiO₂, TiO₂).

🧬 Benefits and Challenges:
- ✅ Benefits (list key advantages)
- ⚠️ Challenges (list common issues)

📖 Study Recommendations: Suggest articles or steps to dive deeper.
`;

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const result = await generateText({
      model: groq('qwen-qwq-32b'),
      providerOptions: {
        groq: { reasoningFormat: 'parsed' },
      },
      prompt: `${basePrompt}\n\nQuestion: ${question}`,
    }) as GroqResponse;

 
      
      return NextResponse.json(result.response.body?.choices[0].message.content);
   
  } catch (error: any) {
    console.error('❌ Error while generating text:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate response' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Send a POST request with { "question": "your question" } in the body.',
  });
}

// import { NextRequest, NextResponse } from 'next/server';
// import { OpenAI } from 'openai';

// // ✅ تحقق من وجود المفاتيح
// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("❌ Missing OPENAI_API_KEY in environment variables");
// }

// // ✅ إعداد عميل OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   // baseURL: process.env.OPENAI_BASE_URL || "https://models.inference.ai.azure.com",
// });

// // ✅ تقدير عدد التوكنز
// function estimateTokens(text: string): number {
//   return Math.ceil(text.length / 4);
// }

// // ✅ تحميل السياق من ملف في public/context
// const loadContext = async () => {
//   try {
//     const baseUrl = process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}`
//       : "http://localhost:3000";

//     const response = await fetch(`${baseUrl}/context/nano.txt`);

//     if (!response.ok) {
//       console.error('❌ Failed to fetch context file:', response.statusText);
//       return "Context file could not be loaded.";
//     }

//     const text = await response.text();

//     if (estimateTokens(text) > 6000) {
//       console.warn("⚠️ Context too large, trimming.");
//       return text.substring(0, 24000);
//     }

//     return text;
//   } catch (error) {
//     console.error("❌ Error loading context:", error);
//     return "Context file could not be loaded.";
//   }
// };

// export async function GET(req: NextRequest) {
//   try {
//     // Extract the question from the query parameters
//     const url = new URL(req.url);
//     const question = url.searchParams.get('question');
    
//     if (!question || typeof question !== 'string') {
//       return NextResponse.json(
//         { error: 'Invalid question format' },
//         { status: 400 }
//       );
//     }
    
//     // Load context
//     const context = loadContext();
    
//     // Create a better system prompt that encourages creative, helpful responses
//     const systemPrompt = `You are an expert assistant for Enhanced Oil Recovery (EOR). 
// Your goal is to provide insightful, creative, and valuable answers about EOR topics.

// When answering:
// - welcome the user for the first message warmly make him want to chat with you again
// - Don't just quote the knowledge verbatim
// - Synthesize information into new insights when possible
// - Use examples and analogies to explain complex concepts
// - Be engaging and conversational, not academic or dry
// - Structure your response clearly with proper formatting
// - Mention relevant relationships between concepts when applicable
// - just try to construct short paragraph not making the reader get bored

// While you should base your answers on the provided knowledge, you should transform that knowledge into something more valuable and insightful than the raw text.`;

//     // Estimate combined tokens
//     const combinedPrompt = `${systemPrompt}\n\nKnowledge:\n${context}\n\nUser: ${question}\nAssistant:`;
//     const estimatedTokens = estimateTokens(combinedPrompt);
//     console.log(`Estimated token count: ${estimatedTokens}`);
    
//     if (estimatedTokens > 7500) {
//       console.warn("Prompt too large, reducing context");
//       const shorterContext = context.substring(0, Math.floor(context.length * 0.6));
      
//       const completion = await openai.chat.completions.create({
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: `Knowledge (summarized):\n${shorterContext}\n\nPlease answer this question creatively and insightfully: ${question}` }
//         ],
//         model: process.env.OPENAI_MODEL || 'gpt-4o',
//         temperature: 1, // Slightly higher temperature for more creative responses
//         max_tokens: 500
//       });
      
//       return NextResponse.json({ 
//         answer: completion.choices[0].message.content || 'No answer generated.' 
//       });
//     }
    
//     // Use separate system and user messages with improved prompting
//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user', content: `Reference knowledge:\n${context}\n\nPlease provide an insightful and helpful answer to this question: ${question}` }
//       ],
//       model: process.env.OPENAI_MODEL || 'gpt-4o',
//       temperature: 1, // Slightly higher temperature for more creative responses
//       max_tokens: 500
//     });
    
//     return NextResponse.json({ 
//       answer: completion.choices[0].message.content || 'No answer generated.' 
//     });
//   } catch (error) {
//     console.error('API error:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to process your request', 
//         details: String(error)
//       },
//       { status: 500 }
//     );
//   }
// }

// // ✅ نقطة البداية
// export async function POST(req: NextRequest) {
//   try {
//     const { question } = await req.json();

//     if (!question || typeof question !== 'string') {
//       return NextResponse.json({ error: 'Invalid question format' }, { status: 400 });
//     }

//     const context = await loadContext();

//     const systemPrompt = `You are an expert assistant for Enhanced Oil Recovery (EOR). 
// Your goal is to provide insightful, creative, and valuable answers about EOR topics.

// When answering:
// - welcome the user for the first message warmly make him want to chat with you again
// - Don't just quote the knowledge verbatim
// - Synthesize information into new insights when possible
// - Use examples and analogies to explain complex concepts
// - Be engaging and conversational, not academic or dry
// - Structure your response clearly with proper formatting
// - Mention relevant relationships between concepts when applicable
// - just try to construct short paragraph not making the reader get bored`;

//     const combinedPrompt = `${systemPrompt}\n\nKnowledge:\n${context}\n\nUser: ${question}`;
//     const estimatedTokens = estimateTokens(combinedPrompt);

//     const usedContext = estimatedTokens > 7500
//       ? context.substring(0, Math.floor(context.length * 0.6))
//       : context;

//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user', content: `Reference knowledge:\n${usedContext}\n\nPlease answer this question: ${question}` }
//       ],
//       model: process.env.OPENAI_MODEL || 'gpt-4o',
//       temperature: 1,
//       max_tokens: 500
//     });

//     return NextResponse.json({
//       answer: completion.choices[0].message.content || 'No answer generated.'
//     });

//   } catch (error) {
//     console.error('❌ API error:', error);
//     return NextResponse.json(
//       {
//         error: 'Failed to process your request',
//         details: String(error)
//       },
//       { status: 500 }
//     );
//   }
// }
// // File: app/api/ask/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createOpenAI } from '@ai-sdk/openai';
// import {OpenAI} from 'openai'
// import fs from 'fs';
// import path from 'path';

// // Initialize OpenAI client
// const openai = new OpenAI({
//   baseURL: process.env.OPENAI_BASE_URL || "https://models.inference.ai.azure.com",
//   apiKey: process.env.OPENAI_API_KEY || "",
// });

// // Simple function to roughly estimate token count
// function estimateTokens(text: string): number {
//   return Math.ceil(text.length / 4);
// }

// // Load and chunk context to avoid token limits
// const loadContext = () => {
//   try {
//     const filePath = path.join(process.cwd(), 'context/nano.txt');
//     if (!fs.existsSync(filePath)) {
//       console.warn('Context file not found:', filePath);
//       return 'Context file not found.';
//     }
    
//     const fullContext = fs.readFileSync(filePath, 'utf-8');
    
//     // If context is small enough, return it all
//     if (estimateTokens(fullContext) < 6000) {
//       return fullContext;
//     }
    
//     // Otherwise, trim the context
//     console.log("Context too large, trimming to fit token limits");
//     const shortenedContext = fullContext.substring(0, 24000); // ~6000 tokens
//     return shortenedContext;
//   } catch (error) {
//     console.error('Error loading context:', error);
//     return 'Error loading context file.';
//   }
// };

// export async function POST(req: NextRequest) {
//   try {
//     const { question } = await req.json();
    
//     if (!question || typeof question !== 'string') {
//       return NextResponse.json(
//         { error: 'Invalid question format' },
//         { status: 400 }
//       );
//     }
    
//     // Load context
//     const context = loadContext();
    
//     // Create a better system prompt that encourages creative, helpful responses
//     const systemPrompt = `You are an expert assistant for Enhanced Oil Recovery (EOR). 
// Your goal is to provide insightful, creative, and valuable answers about EOR topics.

// When answering:
// - welcome the user for the first message warmly make him want to chat with you again
// - Don't just quote the knowledge verbatim
// - Synthesize information into new insights when possible
// - Use examples and analogies to explain complex concepts
// - Be engaging and conversational, not academic or dry
// - Structure your response clearly with proper formatting
// - Mention relevant relationships between concepts when applicable
// - just try to construct short paragraph not making the reader get bored

// While you should base your answers on the provided knowledge, you should transform that knowledge into something more valuable and insightful than the raw text.`;
    
//     // Estimate combined tokens
//     const combinedPrompt = `${systemPrompt}\n\nKnowledge:\n${context}\n\nUser: ${question}\nAssistant:`;
    
//     const estimatedTokens = estimateTokens(combinedPrompt);
//     console.log(`Estimated token count: ${estimatedTokens}`);
    
//     if (estimatedTokens > 7500) {
//       console.warn("Prompt too large, reducing context");
//       const shorterContext = context.substring(0, Math.floor(context.length * 0.6));
      
//       const completion = await openai.chat.completions.create({
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: `Knowledge (summarized):\n${shorterContext}\n\nPlease answer this question creatively and insightfully: ${question}` }
//         ],
//         model: process.env.OPENAI_MODEL || 'gpt-4o',
//         temperature: 1, // Slightly higher temperature for more creative responses
//         max_tokens: 500
//       });
      
//       return NextResponse.json({ 
//         answer: completion.choices[0].message.content || 'No answer generated.'
//       });
//     }
    
//     // Use separate system and user messages with improved prompting
//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user', content: `Reference knowledge:\n${context}\n\nPlease provide an insightful and helpful answer to this question: ${question}` }
//       ],
//       model: process.env.OPENAI_MODEL || 'gpt-4o',
//       temperature: 1, // Slightly higher temperature for more creative responses
//       max_tokens: 500
//     });
    
//     return NextResponse.json({ 
//       answer: completion.choices[0].message.content || 'No answer generated.'
//     });
//   } catch (error) {
//     console.error('API error:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to process your request', 
//         details: String(error)
//       },
//       { status: 500 }
//     );
//   }
// }