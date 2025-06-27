import React, { useState } from 'react';
import { 
  BookOpen, 
  Upload, 
  Image, 
  Video, 
  FileText, 
  X, 
  DollarSign,
  Clock,
  Users,
  Star,
  Zap,
  Target,
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

interface CourseFile {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'image';
  size: number;
  url?: string;
}

interface StartCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (courseData: any) => void;
}

const difficultyOptions = [
  {
    value: 'beginner',
    label: 'Beginner',
    icon: <Star className="h-4 w-4 text-green-500" />,
    description: 'Perfect for newcomers to the subject'
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    icon: <Target className="h-4 w-4 text-yellow-500" />,
    description: 'For students with some prior knowledge'
  },
  {
    value: 'advanced',
    label: 'Advanced',
    icon: <Zap className="h-4 w-4 text-red-500" />,
    description: 'Challenging content for experienced learners'
  }
];

const categoryOptions = [
  { value: 'programming', label: 'Programming', icon: '💻' },
  { value: 'science', label: 'Science', icon: '🔬' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'mathematics', label: 'Mathematics', icon: '📊' },
  { value: 'language', label: 'Language', icon: '🗣️' },
  { value: 'health', label: 'Health & Fitness', icon: '💪' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'photography', label: 'Photography', icon: '📸' },
  { value: 'other', label: 'Other', icon: '📚' }
];

export function StartCourseModal({ open, onOpenChange, onSave }: StartCourseModalProps) {
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    price: '',
    isFree: false,
    description: '',
    category: '',
    thumbnail: null as File | null
  });
  const [files, setFiles] = useState<CourseFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!courseData.name.trim()) newErrors.name = 'Course name is required';
      if (!courseData.difficulty) newErrors.difficulty = 'Please select a difficulty level';
      if (!courseData.duration) newErrors.duration = 'Duration is required';
      if (!courseData.isFree && !courseData.price) newErrors.price = 'Price is required for paid courses';
    }

    if (currentStep === 2) {
      if (!courseData.description.trim()) newErrors.description = 'Course description is required';
      if (!courseData.category) newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleFileUpload = (uploadedFiles: FileList) => {
    Array.from(uploadedFiles).forEach(file => {
      const fileType = file.type.includes('video') ? 'video' : 
                      file.type.includes('image') ? 'image' : 'pdf';
      
      const newFile: CourseFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: fileType,
        size: file.size,
        url: URL.createObjectURL(file)
      };
      
      setFiles(prev => [...prev, newFile]);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSave = (isDraft = false) => {
    if (!isDraft && !validateStep(3)) return;

    const finalCourseData = {
      ...courseData,
      files,
      status: isDraft ? 'draft' : 'published',
      createdAt: new Date().toISOString()
    };

    onSave(finalCourseData);
    onOpenChange(false);
    
    // Reset form
    setCourseData({
      name: '',
      difficulty: '',
      duration: '',
      price: '',
      isFree: false,
      description: '',
      category: '',
      thumbnail: null
    });
    setFiles([]);
    setStep(1);
    setErrors({});
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-red-500" />;
      case 'image': return <Image className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalHeader onClose={() => onOpenChange(false)}>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary-500" />
            Start New Course
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Create an engaging learning experience for your students
          </p>
        </div>
      </ModalHeader>

      <ModalContent>
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    step >= stepNumber 
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg" 
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                  )}>
                    {step > stepNumber ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    step >= stepNumber ? "text-neutral-900 dark:text-white" : "text-neutral-500"
                  )}>
                    {stepNumber === 1 && "Basic Info"}
                    {stepNumber === 2 && "Details"}
                    {stepNumber === 3 && "Content"}
                  </span>
                  {stepNumber < 3 && (
                    <div className={cn(
                      "w-12 h-0.5 transition-colors duration-300",
                      step > stepNumber ? "bg-primary-500" : "bg-neutral-300 dark:bg-neutral-600"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Course Basics
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Let's start with the fundamental details of your course
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Course Name *
                  </label>
                  <Input
                    value={courseData.name}
                    onChange={(e) => setCourseData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Introduction to Web Development"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Difficulty Level *
                  </label>
                  <Select
                    options={difficultyOptions}
                    value={courseData.difficulty}
                    onChange={(value) => setCourseData(prev => ({ ...prev, difficulty: value }))}
                    placeholder="Select difficulty"
                    className={errors.difficulty ? "border-red-500" : ""}
                  />
                  {errors.difficulty && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.difficulty}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Duration (hours) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                      type="number"
                      value={courseData.duration}
                      onChange={(e) => setCourseData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 20"
                      className={cn("pl-10", errors.duration ? "border-red-500" : "")}
                      min="1"
                      max="500"
                    />
                  </div>
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.duration}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Pricing
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="free-course"
                        checked={courseData.isFree}
                        onChange={(e) => setCourseData(prev => ({ 
                          ...prev, 
                          isFree: e.target.checked,
                          price: e.target.checked ? '' : prev.price
                        }))}
                        className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                      />
                      <label htmlFor="free-course" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        This is a free course
                      </label>
                    </div>
                    
                    {!courseData.isFree && (
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <Input
                          type="number"
                          value={courseData.price}
                          onChange={(e) => setCourseData(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="99.00"
                          className={cn("pl-10", errors.price ? "border-red-500" : "")}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    )}
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Course Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Course Details
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Help students understand what they'll learn and achieve
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Course Description *
                  </label>
                  <Textarea
                    value={courseData.description}
                    onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what students will learn, the skills they'll gain, and what makes this course unique..."
                    className={cn("min-h-[120px]", errors.description ? "border-red-500" : "")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Category *
                  </label>
                  <Select
                    options={categoryOptions.map(cat => ({
                      value: cat.value,
                      label: cat.label,
                      icon: <span className="text-lg">{cat.icon}</span>
                    }))}
                    value={courseData.category}
                    onChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}
                    placeholder="Select a category"
                    className={errors.category ? "border-red-500" : ""}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Course Thumbnail (Optional)
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                    <Image className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      Upload a course thumbnail image
                    </p>
                    <p className="text-xs text-neutral-500">
                      Recommended: 1280x720px, JPG or PNG
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setCourseData(prev => ({ ...prev, thumbnail: file }));
                        }
                      }}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3"
                      onClick={() => document.getElementById('thumbnail-upload')?.click()}
                    >
                      Choose Image
                    </Button>
                  </div>
                  {courseData.thumbnail && (
                    <div className="mt-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          {courseData.thumbnail.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setCourseData(prev => ({ ...prev, thumbnail: null }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Content Upload */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Course Content
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Upload your course materials - videos, PDFs, and images
                </p>
              </div>

              {/* Upload Area */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
                  dragActive 
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" 
                    : "border-neutral-300 dark:border-neutral-600 hover:border-primary-400"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Upload Course Materials
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <div className="flex justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => document.getElementById('video-upload')?.click()}
                  >
                    <Video className="h-4 w-4" />
                    Upload Videos
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                  >
                    <FileText className="h-4 w-4" />
                    Upload PDFs
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Image className="h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
                
                {/* Hidden file inputs */}
                <input
                  id="video-upload"
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <input
                  id="pdf-upload"
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">
                    Uploaded Files ({files.length})
                  </h4>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-white">{file.name}</p>
                            <p className="text-sm text-neutral-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {file.type}
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ModalContent>

      <ModalFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {step === 3 && (
              <Button variant="outline" onClick={() => handleSave(true)}>
                Save Draft
              </Button>
            )}
            
            {step < 3 ? (
              <Button onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button onClick={() => handleSave(false)} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Create & Publish Course
              </Button>
            )}
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}