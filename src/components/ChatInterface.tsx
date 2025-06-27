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
  X,
  Check
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
      content: "Hello! I'm Rafiq, your AI teaching assistant. I can help you with:\n\n• **Lesson Planning** - Create engaging lesson plans and curricula\n• **Quiz Creation** - Generate quizzes and assessments\n• **Student Analytics** - Analyze performance and provide insights\n• **Content Development** - Help create educational materials\n• **Teaching Strategies** - Suggest effective teaching methods\n\nWhat would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
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

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate AI response with more realistic teaching-related responses
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me break this down into manageable steps:\n\n1. **Assessment** - First, let's identify your specific learning objectives\n2. **Planning** - Then we'll create a structured approach\n3. **Implementation** - Finally, we'll discuss best practices for execution\n\nWhich aspect would you like to focus on first?",
        
        "That's an excellent question! Based on educational best practices, here's what I recommend:\n\n**For Student Engagement:**\n• Use interactive elements and real-world examples\n• Incorporate multimedia content when possible\n• Provide regular feedback and check-ins\n\n**For Learning Outcomes:**\n• Set clear, measurable objectives\n• Use varied assessment methods\n• Allow for different learning styles\n\nWould you like me to elaborate on any of these points?",
        
        "Great idea! I can definitely help you create that. Here's a structured approach:\n\n```markdown\n# Lesson Plan Template\n\n## Learning Objectives\n- Students will be able to...\n- Students will understand...\n\n## Materials Needed\n- [List materials here]\n\n## Activities\n1. **Introduction** (5 min)\n2. **Main Content** (20 min)\n3. **Practice** (10 min)\n4. **Wrap-up** (5 min)\n```\n\nShall I help you customize this for your specific subject?",
        
        "Perfect! Let me provide you with some detailed guidance on this topic:\n\n**Key Considerations:**\n• Student age group and learning level\n• Available time and resources\n• Learning environment (in-person/online)\n• Assessment requirements\n\n**Next Steps:**\n1. Define your success criteria\n2. Choose appropriate teaching methods\n3. Plan for differentiated instruction\n4. Prepare assessment tools\n\nWhat specific subject or topic are you working with?"
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

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Handle headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-base font-semibold mb-1 text-neutral-900 dark:text-white">
            {line.substring(4)}
          </h3>
        );
      }

      // Handle bullet points
      if (line.startsWith('• ')) {
        const content = line.substring(2);
        const boldMatch = content.match(/\*\*(.*?)\*\*(.*)/);
        if (boldMatch) {
          return (
            <div key={index} className="flex items-start gap-2 mb-1">
              <span className="text-neutral-500 mt-1">•</span>
              <span>
                <strong className="font-semibold text-neutral-900 dark:text-white">
                  {boldMatch[1]}
                </strong>
                <span className="text-neutral-700 dark:text-neutral-300">
                  {boldMatch[2]}
                </span>
              </span>
            </div>
          );
        }
        return (
          <div key={index} className="flex items-start gap-2 mb-1">
            <span className="text-neutral-500 mt-1">•</span>
            <span className="text-neutral-700 dark:text-neutral-300">{content}</span>
          </div>
        );
      }

      // Handle numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
      if (numberedMatch) {
        const content = numberedMatch[2];
        const boldMatch = content.match(/\*\*(.*?)\*\*(.*)/);
        if (boldMatch) {
          return (
            <div key={index} className="flex items-start gap-2 mb-1">
              <span className="text-neutral-500 font-medium">{numberedMatch[1]}.</span>
              <span>
                <strong className="font-semibold text-neutral-900 dark:text-white">
                  {boldMatch[1]}
                </strong>
                <span className="text-neutral-700 dark:text-neutral-300">
                  {boldMatch[2]}
                </span>
              </span>
            </div>
          );
        }
        return (
          <div key={index} className="flex items-start gap-2 mb-1">
            <span className="text-neutral-500 font-medium">{numberedMatch[1]}.</span>
            <span className="text-neutral-700 dark:text-neutral-300">{content}</span>
          </div>
        );
      }

      // Handle code blocks
      if (line.startsWith('```')) {
        const language = line.substring(3);
        return (
          <div key={index} className="text-xs text-neutral-500 mt-2 mb-1">
            {language || 'code'}
          </div>
        );
      }
      if (line === '```') {
        return <div key={index} className="mb-2"></div>;
      }
      if (line.startsWith('    ') || line.startsWith('\t')) {
        return (
          <pre key={index} className="bg-neutral-100 dark:bg-neutral-800 rounded p-2 text-sm font-mono text-neutral-800 dark:text-neutral-200 mb-1 overflow-x-auto">
            {line.trim()}
          </pre>
        );
      }

      // Handle bold text
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-neutral-900 dark:text-white">$1</strong>');
      
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>;
      }

      // Regular text
      return (
        <p key={index} className="text-neutral-700 dark:text-neutral-300 mb-2" 
           dangerouslySetInnerHTML={{ __html: boldText }} />
      );
    });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    
    return (
      <div key={message.id} className={cn(
        "group relative",
        isUser ? "ml-12" : "mr-12"
      )}>
        <div className={cn(
          "flex gap-3 p-4",
          isUser ? "justify-end" : "justify-start"
        )}>
          {/* Avatar for assistant */}
          {!isUser && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
          )}

          {/* Message Content */}
          <div className={cn(
            "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
            isUser 
              ? "bg-primary-500 text-white ml-auto" 
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
          )}>
            <div className="text-sm leading-relaxed">
              {isUser ? (
                <p>{message.content}</p>
              ) : (
                <div className="space-y-1">
                  {formatMessageContent(message.content)}
                </div>
              )}
            </div>
          </div>

          {/* Avatar for user */}
          {isUser && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 ml-11 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={() => copyToClipboard(message.content, message.id)}
            >
              {copiedMessageId === message.id ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <ThumbsDown className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Timestamp */}
        <div className={cn(
          "text-xs text-neutral-500 mt-1 px-4",
          isUser ? "text-right mr-11" : "ml-11"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 relative">
      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary-500/10 border-2 border-dashed border-primary-500 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-xl">
              <div className="text-center">
                <Paperclip className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-neutral-900 dark:text-white">Drop files here</p>
                <p className="text-sm text-neutral-500">Supports images, documents, and more</p>
              </div>
            </div>
          </div>
        )}

        {messages.map(renderMessage)}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="mr-12">
            <div className="flex gap-3 p-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 dark:border-neutral-700 p-4">
        {/* Attached Files */}
        {attachedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
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
          <div className="flex items-end gap-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-2xl p-3 focus-within:border-primary-500 dark:focus-within:border-primary-400 transition-colors">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 h-8 w-8 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
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
              className="flex-shrink-0 h-8 w-8 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <Mic className="h-4 w-4" />
            </Button>

            {/* Send Button */}
            {(inputValue.trim() || attachedFiles.length > 0) && (
              <Button
                onClick={handleSend}
                size="icon"
                className="flex-shrink-0 h-8 w-8 bg-primary-500 hover:bg-primary-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Helper Text */}
          <p className="text-xs text-neutral-500 mt-2 text-center">
            Rafiq can make mistakes. Consider checking important information.
          </p>
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