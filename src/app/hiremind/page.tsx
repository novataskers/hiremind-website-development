"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, Send, Layers3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

// Updated webhook URL from n8n
const WEBHOOK_URL = 'https://hiremindv9.app.n8n.cloud/webhook/38a33471-e57d-490f-a5d5-4ab6ba228ebf/chat';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function HiremindPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([{
    id: "initial",
    role: "assistant",
    content: "Hi! I'm Hiremind, your AI Job Assistant. I'll help you find job leads and send personalized cold emails. What job are you an expert in?",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('hiremind_session_id');
      if (!id) {
        id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('hiremind_session_id', id);
      }
      return id;
    }
    return `session_${Date.now()}`;
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: sessionId,
          chatInput: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      let aiResponse = "Sorry, I couldn't process that request.";
      if (data.output) {
        aiResponse = data.output;
      } else if (data.message) {
        aiResponse = data.message;
      }
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Failed to send message. Please check your connection and try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Layers3 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">HIREMIND</span>
          </Link>
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="pt-16 h-screen flex flex-col">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="max-w-5xl mx-auto h-full flex flex-col">
            {/* Modern Glossy Chat Card */}
            <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-xl supports-[backdrop-filter]:bg-card/30 shadow-2xl">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {/* Avatar */}
                        {message.role === "assistant" ? (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg flex items-center justify-center flex-shrink-0">
                            <Layers3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-accent via-primary to-primary shadow-lg flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                        
                        {/* Message Bubble */}
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground"
                              : "bg-muted/80 text-foreground border border-border/50"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg flex items-center justify-center flex-shrink-0">
                          <Layers3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                        </div>
                        <div className="bg-muted/80 border border-border/50 rounded-2xl px-4 py-3 flex gap-1.5 shadow-lg">
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-border/50 bg-gradient-to-r from-transparent via-primary/5 to-transparent p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 rounded-2xl border-2 border-border/50 px-5 py-6 bg-background/50 backdrop-blur-sm focus:border-primary/50 transition-all text-sm sm:text-base"
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="flex-shrink-0 rounded-2xl w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary via-primary to-accent hover:shadow-xl hover:scale-105 transition-all shadow-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}