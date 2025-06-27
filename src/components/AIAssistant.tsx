import React, { useState } from 'react';
import { Bot, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/Button';
import { ChatInterface } from './ChatInterface';
import { cn } from '../utils/cn';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop for maximized mode */}
          {isMaximized && (
            <div className="fixed inset-0 bg-black/50 z-40" />
          )}
          
          <div className={cn(
            "fixed z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl transition-all duration-300",
            isMaximized 
              ? "inset-4 rounded-2xl" 
              : "bottom-6 right-6 w-96 h-[600px] rounded-2xl"
          )}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">AI Assistant</h3>
                  <p className="text-xs text-neutral-500">Online</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMaximize}
                  className="h-8 w-8"
                >
                  {isMaximized ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMaximized(false);
                  }}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="h-full pb-16">
              <ChatInterface />
            </div>
          </div>
        </>
      )}
    </>
  );
}