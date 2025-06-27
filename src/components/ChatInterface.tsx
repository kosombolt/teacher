import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RotateCcw,
  MoreHorizontal,
  Image,
  FileText,
  X
} from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI teaching assistant. I can help you with lesson planning, creating quizzes, analyzing student performance, and much more. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me break this down into manageable steps...",
        "That's a great question! Here's what I recommend based on educational best practices:",
        "I can definitely assist with that. Let me provide you with some detailed guidance:",
        "Excellent! I have several suggestions that could work well for your teaching goals:"
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (files: FileList) => {
    const newFiles: AttachedFile[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setAttachedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    
    return (
      <div key={message.id} className={cn(
        "flex gap-4 p-6 group",
        isUser ? "bg-transparent" : "bg-neutral-50 dark:bg-neutral-800/50"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-gradient-to-r from-primary-500 to-secondary-500" 
            : "bg-neutral-200 dark:bg-neutral-700"
        )}>
          {isUser ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm text-neutral-900 dark:text-white">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="text-xs text-neutral-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="text-neutral-900 dark:text-neutral-100 leading-relaxed">
              {message.content.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? "mt-4" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Message Actions */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsDown className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <RotateCcw className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-neutral-900 dark:text-white">AI Teaching Assistant</h1>
            <p className="text-sm text-neutral-500">Always here to help with your teaching needs</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag Overlay */}
        {isDragOver && (
          <div className="fixed inset-0 bg-primary-500/10 border-2 border-dashed border-primary-500 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-xl">
              <div className="text-center">
                <Paperclip className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-neutral-900 dark:text-white">Drop files here</p>
                <p className="text-sm text-neutral-500">Supports images, documents, and more</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {messages.map(renderMessage)}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 p-6 bg-neutral-50 dark:bg-neutral-800/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                <Bot className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm text-neutral-900 dark:text-white">AI Assistant</span>
                  <span className="text-xs text-neutral-500">typing...</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 dark:border-neutral-700 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {attachedFiles.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 pr-1"
                >
                  <div className="flex items-center gap-2">
                    {file.type.startsWith('image/') ? (
                      <Image className="h-4 w-4 text-neutral-500" />
                    ) : (
                      <FileText className="h-4 w-4 text-neutral-500" />
                    )}
                    <div className="text-sm">
                      <p className="font-medium text-neutral-900 dark:text-white truncate max-w-32">
                        {file.name}
                      </p>
                      <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Input Container */}
          <div className="relative">
            <div className="flex items-end gap-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-2xl p-3 focus-within:border-primary-500 dark:focus-within:border-primary-400 transition-colors">
              {/* Attachment Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 h-8 w-8"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              {/* Text Input */}
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Send a message..."
                  className="w-full resize-none border-0 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-0 max-h-32"
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '24px',
                    maxHeight: '128px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>

              {/* Voice Input Button */}
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-8 w-8"
              >
                <Mic className="h-4 w-4" />
              </Button>

              {/* Send Button */}
              {(inputValue.trim() || attachedFiles.length > 0) && (
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="flex-shrink-0 h-8 w-8 bg-primary-500 hover:bg-primary-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Helper Text */}
            <p className="text-xs text-neutral-500 mt-2 text-center">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
      />
    </div>
  );
}