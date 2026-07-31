/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-2 bg-card border border-primary/30 text-card-foreground px-4 py-2 rounded-full shadow-lg animate-bounce mr-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Chat with RazaMind AI</span>
          </div>
        )}
        <div className="relative">
          {/* Glowing pulse ring */}
          {!isOpen && (
            <div className="absolute -inset-2 bg-primary/20 rounded-full animate-pulse z-[-1]"></div>
          )}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-all bg-primary text-primary-foreground border-2 border-primary/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {isOpen ? <X className="w-7 h-7" /> : <Bot className="w-8 h-8 animate-pulse" />}
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] z-50 flex flex-col overflow-hidden shadow-2xl border-border/50 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-primary-foreground py-4 rounded-t-xl shrink-0">
            <CardTitle className="text-lg flex items-center gap-2 font-mono">
              <Bot className="w-5 h-5" />
              RazaMind
            </CardTitle>
            <p className="text-xs text-primary-foreground/80 font-mono">
              Ask me anything about Ali Raza!
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto min-h-0 p-4 bg-secondary/20 flex flex-col gap-4 relative">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm">Hi! I&apos;m RazaMind, an AI trained on Ali&apos;s portfolio and skills.</p>
                <p className="text-xs">Try asking: &quot;What are your skills?&quot; or &quot;Tell me about your GPT Clone project.&quot;</p>
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
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
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
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border overflow-hidden">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="p-4 rounded-xl bg-card border border-border rounded-tl-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}

            {error && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-red-500" />
                </div>
                <div className="p-3 rounded-xl text-sm bg-red-500/10 text-red-500 border border-red-500/30 rounded-tl-sm font-medium flex flex-col gap-1">
                  <p>Oops! I couldn&apos;t connect.</p>
                  <p className="text-xs opacity-80 font-mono bg-red-500/10 p-2 rounded break-all">{error.message || "Please make sure you have added your API keys (GROQ_API_KEY) in .env.local and restarted the server."}</p>
                </div>
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
