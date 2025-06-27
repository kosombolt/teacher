import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Copy, 
  Edit, 
  Trash2, 
  Upload, 
  Download,
  FolderPlus,
  Tag,
  MoreVertical
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { cn } from '../utils/cn';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  tags: string[];
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  createdAt: string;
  usageCount: number;
}

interface QuestionBankProps {
  onBack: () => void;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What is the primary function of the cell membrane?',
    subject: 'Biology',
    topic: 'Cell Structure',
    difficulty: 'medium',
    points: 5,
    tags: ['cell biology', 'membrane', 'function'],
    options: [
      'Energy production',
      'Protein synthesis',
      'Selective permeability',
      'DNA storage'
    ],
    correctAnswer: 2,
    explanation: 'The cell membrane controls what enters and exits the cell through selective permeability.',
    createdAt: '2025-01-10',
    usageCount: 15
  },
  {
    id: '2',
    type: 'true-false',
    question: 'Mitochondria are found only in plant cells.',
    subject: 'Biology',
    topic: 'Cell Organelles',
    difficulty: 'easy',
    points: 3,
    tags: ['mitochondria', 'organelles', 'plant cells'],
    correctAnswer: 'false',
    explanation: 'Mitochondria are found in both plant and animal cells.',
    createdAt: '2025-01-08',
    usageCount: 22
  },
  {
    id: '3',
    type: 'short-answer',
    question: 'Explain the process of photosynthesis in 2-3 sentences.',
    subject: 'Biology',
    topic: 'Photosynthesis',
    difficulty: 'hard',
    points: 10,
    tags: ['photosynthesis', 'plants', 'energy'],
    correctAnswer: 'Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in chloroplasts and involves the conversion of carbon dioxide and water into glucose and oxygen using sunlight.',
    createdAt: '2025-01-05',
    usageCount: 8
  }
];

export function QuestionBank({ onBack }: QuestionBankProps) {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || question.subject === filterSubject;
    const matchesDifficulty = filterDifficulty === 'all' || question.difficulty === filterDifficulty;
    const matchesType = filterType === 'all' || question.type === filterType;
    return matchesSearch && matchesSubject && matchesDifficulty && matchesType;
  });

  const subjects = Array.from(new Set(questions.map(q => q.subject)));
  const topics = Array.from(new Set(questions.map(q => q.topic)));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return '○';
      case 'true-false': return '✓';
      case 'short-answer': return '✎';
      case 'essay': return '📝';
      default: return '?';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on questions:`, selectedQuestions);
    // Implement bulk actions
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quiz Manager
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Question Bank</h1>
              <p className="text-slate-400">Manage and organize your reusable questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">{questions.length}</div>
              <div className="text-xs text-slate-400">Across all subjects</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">{subjects.length}</div>
              <div className="text-xs text-slate-400">Different subjects</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">{topics.length}</div>
              <div className="text-xs text-slate-400">Different topics</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Most Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">
                {Math.max(...questions.map(q => q.usageCount))}
              </div>
              <div className="text-xs text-slate-400">Times used</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All Questions</TabsTrigger>
              <TabsTrigger value="multiple-choice">Multiple Choice</TabsTrigger>
              <TabsTrigger value="true-false">True/False</TabsTrigger>
              <TabsTrigger value="short-answer">Short Answer</TabsTrigger>
              <TabsTrigger value="essay">Essay</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-100"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-100"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedQuestions.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700 mb-4">
              <span className="text-sm text-slate-300">{selectedQuestions.length} questions selected</span>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('copy')}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          )}

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedQuestions(prev => [...prev, question.id]);
                          } else {
                            setSelectedQuestions(prev => prev.filter(id => id !== question.id));
                          }
                        }}
                        className="mt-1"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getTypeIcon(question.type)}</span>
                            <Badge variant="outline" className="text-xs">
                              {question.type.replace('-', ' ')}
                            </Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.points} pts
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <h3 className="font-medium text-slate-100 mb-2 line-clamp-2">
                          {question.question}
                        </h3>

                        {question.type === 'multiple-choice' && question.options && (
                          <div className="mb-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {question.options.map((option, index) => (
                                <div 
                                  key={index} 
                                  className={cn(
                                    "p-2 rounded border",
                                    question.correctAnswer === index 
                                      ? "border-green-500/50 bg-green-500/10 text-green-400" 
                                      : "border-slate-600 bg-slate-700/50 text-slate-300"
                                  )}
                                >
                                  {String.fromCharCode(65 + index)}. {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {question.type === 'true-false' && (
                          <div className="mb-3">
                            <p className="text-sm text-slate-300">
                              Correct Answer: <span className="font-medium text-green-400">
                                {question.correctAnswer}
                              </span>
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                          <span>{question.subject} • {question.topic}</span>
                          <span>Used {question.usageCount} times</span>
                          <span>Created {question.createdAt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {question.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {question.explanation && (
                          <div className="mt-3 p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-sm text-slate-300">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would filter by question type */}
          <TabsContent value="multiple-choice">
            <div className="space-y-4">
              {filteredQuestions.filter(q => q.type === 'multiple-choice').map((question) => (
                <Card key={question.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-slate-100 mb-2">{question.question}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {question.options?.map((option, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "p-2 rounded border",
                            question.correctAnswer === index 
                              ? "border-green-500/50 bg-green-500/10 text-green-400" 
                              : "border-slate-600 bg-slate-700/50 text-slate-300"
                          )}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="true-false">
            <div className="space-y-4">
              {filteredQuestions.filter(q => q.type === 'true-false').map((question) => (
                <Card key={question.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-slate-100 mb-2">{question.question}</h3>
                    <p className="text-sm text-slate-300">
                      Correct Answer: <span className="font-medium text-green-400">
                        {question.correctAnswer}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="short-answer">
            <div className="space-y-4">
              {filteredQuestions.filter(q => q.type === 'short-answer').map((question) => (
                <Card key={question.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-slate-100 mb-2">{question.question}</h3>
                    {question.correctAnswer && (
                      <div className="p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-sm text-slate-300">
                          <span className="font-medium">Sample Answer:</span> {question.correctAnswer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="essay">
            <div className="space-y-4">
              {filteredQuestions.filter(q => q.type === 'essay').map((question) => (
                <Card key={question.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-slate-100 mb-2">{question.question}</h3>
                    {question.correctAnswer && (
                      <div className="p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-sm text-slate-300">
                          <span className="font-medium">Grading Rubric:</span> {question.correctAnswer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}