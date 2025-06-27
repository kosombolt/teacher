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
  Check,
  BookOpen,
  Users,
  BarChart3,
  HelpCircle,
  Lightbulb,
  Target,
  Zap,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
}

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

const quickActions = [
  {
    icon: BookOpen,
    label: "Create Lesson Plan",
    prompt: "Help me create a lesson plan for [subject/topic]. I need it to be engaging and suitable for [grade level] students.",
    color: "bg-blue-500"
  },
  {
    icon: Users,
    label: "Student Engagement",
    prompt: "Give me strategies to increase student engagement in my [subject] class. My students seem disinterested lately.",
    color: "bg-green-500"
  },
  {
    icon: BarChart3,
    label: "Assessment Ideas",
    prompt: "Suggest creative assessment methods for [topic] that go beyond traditional tests and quizzes.",
    color: "bg-purple-500"
  },
  {
    icon: HelpCircle,
    label: "Teaching Tips",
    prompt: "I'm struggling with [specific teaching challenge]. Can you provide some practical solutions and tips?",
    color: "bg-orange-500"
  }
];

const aiCapabilities = [
  {
    icon: Lightbulb,
    title: "Lesson Planning",
    description: "Create detailed lesson plans with objectives, activities, and assessments"
  },
  {
    icon: Target,
    title: "Learning Objectives",
    description: "Develop clear, measurable learning objectives aligned with standards"
  },
  {
    icon: Zap,
    title: "Engagement Strategies",
    description: "Get ideas for interactive activities and student engagement techniques"
  },
  {
    icon: Calendar,
    title: "Curriculum Design",
    description: "Plan comprehensive curricula and course structures"
  },
  {
    icon: BarChart3,
    title: "Assessment Creation",
    description: "Generate quizzes, rubrics, and various assessment tools"
  },
  {
    icon: MessageSquare,
    title: "Teaching Support",
    description: "Get answers to teaching questions and classroom management advice"
  }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm Rafiq, your AI teaching assistant. I'm here to help you create amazing educational experiences for your students.\n\n**What I can help you with:**\n\n• **Lesson Planning** - Create engaging lesson plans and curricula\n• **Assessment Design** - Generate quizzes, rubrics, and evaluation tools\n• **Student Engagement** - Strategies to keep students motivated and involved\n• **Content Development** - Help create educational materials and resources\n• **Teaching Strategies** - Evidence-based methods for effective instruction\n• **Classroom Management** - Tips for creating a positive learning environment\n\nWhat would you like to work on today? You can ask me anything or use one of the quick actions below!",
      timestamp: new Date(),
      suggestions: [
        "Create a lesson plan for photosynthesis",
        "How can I make math more engaging?",
        "Design a quiz for American History",
        "Help with classroom management"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Lesson planning responses
    if (lowerMessage.includes('lesson plan') || lowerMessage.includes('lesson')) {
      return `Great! I'd love to help you create an engaging lesson plan. Here's a structured approach:\n\n**📚 Lesson Plan Framework:**\n\n**1. Learning Objectives**\n• What should students know/be able to do?\n• Make them specific and measurable\n\n**2. Materials & Resources**\n• List all needed materials\n• Include technology requirements\n• Prepare backup options\n\n**3. Lesson Structure**\n• **Opening (5-10 min):** Hook/warm-up activity\n• **Introduction (10-15 min):** Present new concept\n• **Guided Practice (15-20 min):** Work through examples together\n• **Independent Practice (10-15 min):** Students practice on their own\n• **Closure (5 min):** Summarize and preview next lesson\n\n**4. Assessment**\n• How will you check understanding?\n• Formative assessment during lesson\n• Summative assessment options\n\n**5. Differentiation**\n• Support for struggling learners\n• Extensions for advanced students\n\nWhat subject and grade level are you planning for? I can make this more specific!`;
    }
    
    // Student engagement responses
    if (lowerMessage.includes('engagement') || lowerMessage.includes('engage') || lowerMessage.includes('motivate')) {
      return `Excellent question! Student engagement is crucial for effective learning. Here are proven strategies:\n\n**🎯 Engagement Strategies:**\n\n**Interactive Techniques:**\n• Think-Pair-Share activities\n• Hands-on experiments and projects\n• Gamification elements (points, badges, leaderboards)\n• Real-world connections and case studies\n\n**Technology Integration:**\n• Interactive polls and quizzes (Kahoot, Mentimeter)\n• Virtual field trips and simulations\n• Collaborative online tools\n• Multimedia presentations\n\n**Student Choice & Voice:**\n• Let students choose topics or methods\n• Student-led discussions and presentations\n• Flexible seating arrangements\n• Multiple ways to demonstrate learning\n\n**Movement & Variety:**\n• Gallery walks and station rotations\n• Brain breaks and energizers\n• Vary instructional methods every 10-15 minutes\n• Incorporate music and movement\n\n**Building Relationships:**\n• Learn student interests and incorporate them\n• Celebrate student achievements\n• Create a safe, supportive environment\n• Use humor appropriately\n\nWhat specific subject or situation are you dealing with? I can provide more targeted suggestions!`;
    }
    
    // Assessment responses
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('assessment') || lowerMessage.includes('evaluate')) {
      return `Perfect! Let me help you create effective assessments. Here's a comprehensive approach:\n\n**📊 Assessment Design Guide:**\n\n**Types of Assessments:**\n• **Formative:** Check understanding during learning\n• **Summative:** Evaluate learning at the end\n• **Diagnostic:** Identify prior knowledge/misconceptions\n• **Authentic:** Real-world application tasks\n\n**Question Types & When to Use:**\n• **Multiple Choice:** Quick knowledge checks, large groups\n• **Short Answer:** Explain concepts briefly\n• **Essay:** Deep thinking, analysis, synthesis\n• **Performance Tasks:** Apply skills in realistic contexts\n\n**Assessment Strategies:**\n• **Rubrics:** Clear criteria and performance levels\n• **Peer Assessment:** Students evaluate each other's work\n• **Self-Assessment:** Reflection and metacognition\n• **Portfolio:** Collection of work over time\n\n**Best Practices:**\n• Align with learning objectives\n• Provide clear instructions and examples\n• Offer multiple ways to demonstrate knowledge\n• Give timely, specific feedback\n• Use results to inform instruction\n\n**Sample Question Stems:**\n• Analyze the relationship between...\n• Compare and contrast...\n• Evaluate the effectiveness of...\n• Create a solution for...\n\nWhat subject and type of assessment are you creating? I can help you design specific questions!`;
    }
    
    // Classroom management responses
    if (lowerMessage.includes('management') || lowerMessage.includes('behavior') || lowerMessage.includes('discipline')) {
      return `Classroom management is fundamental to effective teaching! Here's a comprehensive approach:\n\n**🏫 Classroom Management Strategies:**\n\n**Preventive Measures:**\n• Establish clear expectations and routines\n• Create engaging, well-paced lessons\n• Build positive relationships with students\n• Arrange physical space thoughtfully\n\n**Positive Reinforcement:**\n• Catch students being good\n• Use specific praise ("Great job explaining your thinking")\n• Implement reward systems (points, privileges)\n• Celebrate class achievements\n\n**Clear Procedures:**\n• Entry and exit routines\n• How to ask for help\n• Turning in assignments\n• Group work protocols\n• Emergency procedures\n\n**Addressing Challenges:**\n• Use proximity and non-verbal cues first\n• Private conversations over public corrections\n• Logical consequences related to behavior\n• Restorative practices when appropriate\n\n**Building Community:**\n• Morning meetings or check-ins\n• Class agreements created together\n• Conflict resolution skills\n• Celebrating diversity and inclusion\n\n**Self-Care for Teachers:**\n• Stay calm and consistent\n• Reflect on what works\n• Seek support from colleagues\n• Remember that building relationships takes time\n\nWhat specific classroom management challenge are you facing? I can provide more targeted strategies!`;
    }
    
    // General teaching responses
    if (lowerMessage.includes('teach') || lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return `I'm here to support your teaching journey! Here are some key principles for effective instruction:\n\n**🌟 Effective Teaching Principles:**\n\n**Know Your Students:**\n• Understand their backgrounds and interests\n• Assess prior knowledge\n• Recognize different learning styles\n• Build on their strengths\n\n**Clear Learning Goals:**\n• Share objectives with students\n• Connect to bigger picture\n• Make learning relevant\n• Provide success criteria\n\n**Active Learning:**\n• Engage students in the learning process\n• Use questioning techniques\n• Encourage discussion and collaboration\n• Provide hands-on experiences\n\n**Feedback & Reflection:**\n• Give timely, specific feedback\n• Encourage self-reflection\n• Use mistakes as learning opportunities\n• Celebrate progress and growth\n\n**Continuous Improvement:**\n• Reflect on your practice\n• Try new strategies\n• Learn from colleagues\n• Stay current with research\n\nWhat specific aspect of teaching would you like to explore further? I'm here to help with lesson planning, student engagement, assessment, classroom management, or any other teaching challenge!`;
    }
    
    // Default response
    return `Thank you for your question! I'm here to help you with all aspects of teaching and education.\n\n**I can assist you with:**\n\n• **Lesson Planning:** Create structured, engaging lessons\n• **Curriculum Design:** Plan comprehensive learning sequences\n• **Assessment Creation:** Design quizzes, rubrics, and evaluation tools\n• **Student Engagement:** Strategies to motivate and involve students\n• **Classroom Management:** Create positive learning environments\n• **Teaching Strategies:** Evidence-based instructional methods\n• **Educational Technology:** Integrate digital tools effectively\n• **Differentiation:** Meet diverse student needs\n\nCould you provide more details about what you'd like help with? For example:\n- What subject do you teach?\n- What grade level?\n- What specific challenge are you facing?\n\nThe more context you provide, the better I can tailor my assistance to your needs!`;
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFiles([]);
    setIsTyping(true);
    setShowQuickActions(false);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(textToSend);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: [
          "Can you be more specific?",
          "Show me an example",
          "What about different grade levels?",
          "How do I implement this?"
        ]
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

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt);
    setShowQuickActions(false);
  };

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion);
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
              <span className="text-primary-500 mt-1 font-bold">•</span>
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
            <span className="text-primary-500 mt-1 font-bold">•</span>
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
              <span className="text-primary-500 font-semibold">{numberedMatch[1]}.</span>
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
            <span className="text-primary-500 font-semibold">{numberedMatch[1]}.</span>
            <span className="text-neutral-700 dark:text-neutral-300">{content}</span>
          </div>
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
            
            {/* Suggestions */}
            {!isUser && message.suggestions && (
              <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-xs text-neutral-500 mb-2">Suggested follow-ups:</p>
                <div className="flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

        {/* Quick Actions */}
        {showQuickActions && messages.length === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Quick Actions
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Get started with these common teaching tasks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-left"
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", action.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">{action.label}</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Click to get started</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                What I can help you with:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {aiCapabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <Icon className="h-5 w-5 text-primary-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-neutral-900 dark:text-white">{capability.title}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">{capability.description}</p>
                      </div>
                    </div>
                  );
                })}
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
                placeholder="Ask me anything about teaching, lesson planning, student engagement..."
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
                onClick={() => handleSend()}
                size="icon"
                className="flex-shrink-0 h-8 w-8 bg-primary-500 hover:bg-primary-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Helper Text */}
          <p className="text-xs text-neutral-500 mt-2 text-center">
            Rafiq AI can help with lesson planning, student engagement, assessments, and more. Ask me anything!
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