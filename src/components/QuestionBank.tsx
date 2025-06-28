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
  MoreVertical,
  X,
  CheckCircle,
  BookOpen,
  Eye,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Select } from './ui/Select';
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
  },
  {
    id: '4',
    type: 'essay',
    question: 'Discuss the impact of climate change on marine ecosystems.',
    subject: 'Environmental Science',
    topic: 'Climate Change',
    difficulty: 'hard',
    points: 15,
    tags: ['climate change', 'marine biology', 'ecosystems'],
    correctAnswer: 'Students should discuss ocean acidification, rising sea temperatures, coral bleaching, and impacts on marine food chains.',
    createdAt: '2025-01-03',
    usageCount: 5
  },
  {
    id: '5',
    type: 'multiple-choice',
    question: 'Which of the following is NOT a renewable energy source?',
    subject: 'Environmental Science',
    topic: 'Energy Sources',
    difficulty: 'easy',
    points: 3,
    tags: ['renewable energy', 'sustainability'],
    options: [
      'Solar power',
      'Wind power',
      'Natural gas',
      'Hydroelectric power'
    ],
    correctAnswer: 2,
    explanation: 'Natural gas is a fossil fuel and therefore not renewable.',
    createdAt: '2025-01-01',
    usageCount: 18
  }
];

const questionTypeOptions = [
  { 
    value: 'multiple-choice', 
    label: 'Multiple Choice', 
    icon: <div className="w-4 h-4 rounded-full border-2 border-current" />
  },
  { 
    value: 'true-false', 
    label: 'True/False', 
    icon: <CheckCircle className="h-4 w-4" />
  },
  { 
    value: 'short-answer', 
    label: 'Short Answer', 
    icon: <div className="w-4 h-4 border-b-2 border-current" />
  },
  { 
    value: 'essay', 
    label: 'Essay', 
    icon: <BookOpen className="h-4 w-4" />
  }
];

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

export function QuestionBank({ onBack }: QuestionBankProps) {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Get unique subjects and topics
  const subjects = Array.from(new Set(questions.map(q => q.subject)));
  const topics = Array.from(new Set(questions.map(q => q.topic)));

  // Apply all filters
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || question.subject === filterSubject;
    const matchesDifficulty = filterDifficulty === 'all' || question.difficulty === filterDifficulty;
    const matchesType = filterType === 'all' || question.type === filterType;
    const matchesTab = activeTab === 'all' || question.type === activeTab;
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesType && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    const typeOption = questionTypeOptions.find(opt => opt.value === type);
    return typeOption?.icon || <div className="w-4 h-4 rounded border border-current" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'secondary';
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on questions:`, selectedQuestions);
    // Implement bulk actions
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterSubject('all');
    setFilterDifficulty('all');
    setFilterType('all');
  };

  const hasActiveFilters = searchQuery || filterSubject !== 'all' || filterDifficulty !== 'all' || filterType !== 'all';

  const deleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    setSelectedQuestions(prev => prev.filter(id => id !== questionId));
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = questions.find(q => q.id === questionId);
    if (questionToDuplicate) {
      const duplicatedQuestion: Question = {
        ...questionToDuplicate,
        id: (questions.length + 1).toString(),
        question: `${questionToDuplicate.question} (Copy)`,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setQuestions(prev => [...prev, duplicatedQuestion]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quiz Manager
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Question Bank</h1>
              <p className="text-gray-600 dark:text-neutral-400">Manage and organize your reusable questions</p>
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
          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Total Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{questions.length}</div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">Across all subjects</div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{subjects.length}</div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">Different subjects</div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{topics.length}</div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">Different topics</div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Most Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.max(...questions.map(q => q.usageCount))}
              </div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">Times used</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All Questions ({questions.length})</TabsTrigger>
              <TabsTrigger value="multiple-choice">Multiple Choice ({questions.filter(q => q.type === 'multiple-choice').length})</TabsTrigger>
              <TabsTrigger value="true-false">True/False ({questions.filter(q => q.type === 'true-false').length})</TabsTrigger>
              <TabsTrigger value="short-answer">Short Answer ({questions.filter(q => q.type === 'short-answer').length})</TabsTrigger>
              <TabsTrigger value="essay">Essay ({questions.filter(q => q.type === 'essay').length})</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  variant="modern"
                  className="w-64"
                />
              </div>
              
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className={cn(
                  "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                  "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                  "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                )}
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className={cn(
                  "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                  "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                  "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                )}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400 mb-4">
              <span>Showing {filteredQuestions.length} of {questions.length} questions</span>
              {searchQuery && (
                <Badge variant="outline" className="gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filterSubject !== 'all' && (
                <Badge variant="outline" className="gap-1">
                  Subject: {filterSubject}
                  <button onClick={() => setFilterSubject('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filterDifficulty !== 'all' && (
                <Badge variant="outline" className="gap-1">
                  Difficulty: {filterDifficulty}
                  <button onClick={() => setFilterDifficulty('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Bulk Actions */}
          {selectedQuestions.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-150 dark:border-neutral-700 mb-4">
              <span className="text-sm text-gray-700 dark:text-neutral-300">{selectedQuestions.length} questions selected</span>
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

          <TabsContent value={activeTab}>
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {hasActiveFilters ? 'No questions match your filters' : 'No questions found'}
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 mb-4">
                  {hasActiveFilters 
                    ? 'Try adjusting your search criteria or filters'
                    : 'Start building your question bank by adding your first question'
                  }
                </p>
                {hasActiveFilters ? (
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear All Filters
                  </Button>
                ) : (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <Card key={question.id} variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft hover:shadow-medium transition-all duration-300">
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
                          className={cn(
                            "w-5 h-5 rounded-lg border-2 border-gray-300 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-smooth mt-1",
                            "hover:border-primary-500 hover:shadow-soft hover:scale-110 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                            "checked:bg-gradient-to-r checked:from-primary-500 checked:to-secondary-500 checked:border-primary-500",
                            "dark:border-neutral-600 dark:bg-neutral-800/80 dark:hover:border-primary-400 dark:focus:border-primary-400",
                            "cursor-pointer"
                          )}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(question.type)}
                              <Badge variant="outline" className="text-xs">
                                {questionTypeOptions.find(t => t.value === question.type)?.label}
                              </Badge>
                              <Badge variant={getDifficultyColor(question.difficulty)}>
                                {question.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.points} pts
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => duplicateQuestion(question.id)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-error-500 hover:text-error-600"
                                onClick={() => deleteQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {question.question}
                          </h3>

                          {question.type === 'multiple-choice' && question.options && (
                            <div className="mb-3">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {question.options.map((option, index) => (
                                  <div 
                                    key={index} 
                                    className={cn(
                                      "p-2 rounded border transition-colors duration-200",
                                      question.correctAnswer === index 
                                        ? "border-success-500/50 bg-success-500/10 text-success-600 dark:text-success-400" 
                                        : "border-gray-200 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700/50 text-gray-700 dark:text-neutral-300"
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
                              <p className="text-sm text-gray-700 dark:text-neutral-300">
                                Correct Answer: <span className="font-medium text-success-600 dark:text-success-400">
                                  {question.correctAnswer}
                                </span>
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-neutral-400 mb-3">
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
                            <div className="mt-3 p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                              <p className="text-sm text-gray-700 dark:text-neutral-300">
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}