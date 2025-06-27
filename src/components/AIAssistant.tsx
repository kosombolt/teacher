import React, { useState } from 'react';
import { Bot, X, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { cn } from '../utils/cn';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      content: "Hello! I'm Rafiq, your AI teaching assistant. How can I help you today?", 
      sender: "ai" 
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user"
    };

    const aiResponse: Message = {
      id: messages.length + 2,
      content: "I can help you with lesson planning, student performance analysis, and quiz generation. What would you like to work on?",
      sender: "ai"
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-slate-800 border border-slate-700 rounded-xl shadow-xl flex flex-col animate-in slide-in-from-bottom-2 duration-200">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-violet-400" />
                <h3 className="font-bold text-slate-100">Rafiq Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg text-sm",
                      message.sender === "user"
                        ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white"
                        : "bg-slate-700 text-slate-100"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Rafiq anything..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>
    </div>
  );
}