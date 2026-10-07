/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function RazaMindChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status, error } = useChat();
  const isLoading = status === "submitted" || status === "streaming";
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  // Lets other parts of the page open the chat ("Ask RazaMind a question").
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("razamind:open", open);
    return () => window.removeEventListener("razamind:open", open);
  }, []);

  // Escape closes the window.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Chat button. Sits above the sticky booking bar on phones. */}
      <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          aria-label={isOpen ? "Close RazaMind chat" : "Chat with RazaMind AI"}
          aria-expanded={isOpen}
          aria-controls="razamind-window"
          className="h-14 w-14 rounded-full shadow-lg [&_svg]:size-6"
        >
          {isOpen ? <X aria-hidden="true" /> : <Bot aria-hidden="true" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card
          id="razamind-window"
          role="dialog"
          aria-label="RazaMind chat"
          className="fixed bottom-36 right-4 z-50 flex h-[min(600px,calc(100dvh-11rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden border-border shadow-2xl md:bottom-24 md:right-6 md:h-[min(600px,calc(100dvh-8rem))]"
        >
          <CardHeader className="bg-primary text-primary-foreground py-4 rounded-t-xl shrink-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              RazaMind
            </CardTitle>
            <p className="text-sm text-primary-foreground/80">
              Ask about Ali&apos;s projects, skills, or working together.
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto min-h-0 p-4 bg-secondary/20 flex flex-col gap-4 relative" aria-live="polite">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <p className="text-sm">I&apos;m RazaMind. I answer from Ali&apos;s CV and projects.</p>
                <div className="flex flex-col gap-2">
                  {["How does the hotel voice agent work?", "What is in the GoHighLevel snapshot?", "Is Ali available for hire?"].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage({ text: q })}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:border-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                }`}>
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`p-3 rounded-xl text-sm ${
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-card border border-border rounded-tl-sm"
                }`}>
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap">
                      {m.parts?.filter(p => p.type === 'text').map(p => (p as any).text).join('\n') || (m as any).content || ''}
                    </p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border overflow-hidden break-words">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {m.parts?.filter(p => p.type === 'text').map(p => (p as any).text).join('\n') || (m as any).content || ''}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-xl bg-card border border-border rounded-tl-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" aria-label="RazaMind is typing" />
                </div>
              </div>
            )}

            {error && (
              <div role="alert" className="mr-auto max-w-[85%] rounded-xl border border-border bg-card p-3 text-sm">
                <p className="font-medium">RazaMind couldn&apos;t answer just now.</p>
                <p className="mt-1 text-muted-foreground">
                  Try again in a minute, email{" "}
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-link">
                    {portfolioData.personal.email}
                  </a>
                  , or book a call.
                </p>
                <BookCallButton section="razamind-error" size="sm" className="mt-3" />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>
          
          <CardFooter className="p-3 bg-background border-t border-border shrink-0 rounded-b-xl">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!inputMessage.trim()) return;
              sendMessage({ text: inputMessage });
              setInputMessage("");
            }} className="flex w-full items-center gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message RazaMind..."
                aria-label="Message RazaMind"
                maxLength={1000}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
