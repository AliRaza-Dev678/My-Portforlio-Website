import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { portfolioData, site } from '@/data/portfolio';
import { calendlyUrl } from '@/lib/calendly';

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

// Per-instance limiter. It stops casual abuse of the Groq quota; for a hard
// guarantee across serverless instances, swap in Upstash Ratelimit.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// RazaMind's knowledge base is generated from the same data file as the site,
// which mirrors the CV. Edit src/data/portfolio.ts and both stay in sync.
function buildSystemPrompt() {
  const bookingLink = calendlyUrl('razamind');
  const { personal } = portfolioData;

  return `
You are RazaMind, the assistant embedded in the portfolio of ${personal.name}, ${personal.title}.
You answer questions from recruiters and founders about Ali's projects, skills, experience, education, and contact details.

RULES
- Use only the knowledge base below. It is generated from Ali's CV. Never invent clients, employers, metrics, testimonials, prices, or dates.
- If the answer is not in the knowledge base, say you don't have that detail and offer the booking link or Ali's email (${personal.email}).
- Keep answers short: a few sentences or a short list. Use Markdown.
- When you mention a featured project, link its case study as ${site.url}/projects/<slug>.

BOOKING
- When a visitor asks about hiring Ali, his availability, rates, timelines, interviews, freelance or contract work, or working together in any form, answer briefly and then offer this link:
  [Book a 30-minute intro call](${bookingLink})
- Do not state rates or availability yourself. Those are discussed on the call.
- Offer the link at most once per answer, and don't push it when the question is purely technical.

If asked something unrelated to Ali or software engineering, give a one-line answer and steer back.

KNOWLEDGE BASE (JSON)
${JSON.stringify(portfolioData)}
`;
}

type IncomingMessage = { role: string; content?: string; parts?: { type: string; text?: string }[] };

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return json({ error: 'Too many messages. Try again in a few minutes.' }, 429);
  }

  let messages: IncomingMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const useGroq = !!process.env.GROQ_API_KEY;
  const useOpenAI = !!process.env.OPENAI_API_KEY;

  if (!useGroq && !useOpenAI) {
    // Details go to the server log only; visitors never see setup instructions.
    console.error('RazaMind: set GROQ_API_KEY or OPENAI_API_KEY.');
    return json({ error: 'RazaMind is unavailable right now.' }, 503);
  }

  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });
  const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Prefer Groq if its key exists, otherwise fall back to OpenAI.
  const model = useGroq ? groq.chat('openai/gpt-oss-120b') : openai.chat('gpt-4o-mini');

  const coreMessages = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-MAX_MESSAGES)
    .map((m) => {
      const text =
        m.parts && !m.content
          ? m.parts.filter((p) => p.type === 'text').map((p) => p.text ?? '').join('\n')
          : m.content || '';
      return { role: m.role as 'user' | 'assistant', content: text.slice(0, MAX_CHARS) };
    })
    .filter((m) => m.content.trim().length > 0);

  if (coreMessages.length === 0) {
    return json({ error: 'Empty message.' }, 400);
  }

  const result = await streamText({
    model,
    system: buildSystemPrompt(),
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
