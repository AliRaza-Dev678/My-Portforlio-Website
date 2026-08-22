import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { portfolioData } from '@/data/portfolio';
import { loadEnvConfig } from '@next/env';

// Dynamically load env vars so the user doesn't need to restart the server
loadEnvConfig(process.cwd());

export async function POST(req: Request) {
  const { messages } = await req.json();

  const useGroq = !!process.env.GROQ_API_KEY;
  const useOpenAI = !!process.env.OPENAI_API_KEY;

  if (!useGroq && !useOpenAI) {
    return new Response(
      JSON.stringify({ error: 'No API key provided. Please set GROQ_API_KEY or OPENAI_API_KEY in your .env.local file.' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Create provider instances using current process.env
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Prefer Groq if key exists, otherwise fallback to standard OpenAI
  const modelStr = useGroq ? 'openai/gpt-oss-120b' : 'gpt-4o-mini';
  
  const aiProvider = useGroq ? groq.chat(modelStr) : openai.chat(modelStr);

  // Serialize portfolio data for context
  const contextData = JSON.stringify(portfolioData, null, 2);

  const systemPrompt = `
You are RazaMind, an advanced AI chatbot designed to represent Ali Raza. 
You act as Ali's personalized assistant embedded in his portfolio website.
Your goal is to answer questions about Ali's background, skills, projects, and contact info.
Respond in a friendly, professional, and slightly tech-savvy tone.
If the user asks something completely unrelated to Ali or software engineering, you can politely guide the conversation back or give a short helpful answer and relate it to Ali's expertise.
Always format your answers nicely using Markdown. Use lists or code blocks where appropriate.

Here is Ali's complete background and portfolio data to use as your knowledge base:
${contextData}
`;

  const coreMessages = messages.map((m: { role: string; content?: string; parts?: { type: string; text: string }[] }) => {
    if (m.parts && !m.content) {
      return {
        role: m.role as 'user' | 'assistant',
        content: m.parts.filter((p) => p.type === 'text').map((p) => p.text).join('\n'),
      };
    }
    return {
      role: m.role as 'user' | 'assistant',
      content: m.content || '',
    };
  });

  const result = await streamText({
    model: aiProvider,
    system: systemPrompt,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
