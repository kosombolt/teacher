import React, { useState } from 'react';
import { Upload, X, FileText, Video, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

interface CourseFile {
  id: string;
  name: string;
  type: 'video' | 'pdf';
  size: string;
  duration?: string;
}

interface CourseCreatorProps {
  onClose: () => void;
  onSave: (courseData: any) => void;
}

export function CourseCreator({ onClose, onSave }: CourseCreatorProps) {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    estimatedHours: '',
  });

  const [files, setFiles] = useState<CourseFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    Array.from(fileList).forEach(file => {
      const fileType = file.type.includes('video') ? 'video' : 'pdf';
      const newFile: CourseFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: fileType,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        duration: fileType === 'video' ? '12:34' : undefined,
      };
      setFiles(prev => [...prev, newFile]);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSave = () => {
    const newCourse = {
      ...courseData,
      files,
      id: Math.random().toString(36).substr(2, 9),
      students: 0,
      completionRate: 0,
      avgGrade: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
    };
    onSave(newCourse);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Course Basic Info */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Course Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Course Title
            </label>
            <Input
              value={courseData.title}
              onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter course title..."
              className="bg-slate-700 border-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <Textarea
              value={courseData.description}
              onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your course..."
              className="bg-slate-700 border-slate-600 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <Input
                value={courseData.category}
                onChange={(e) => setCourseData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Biology, Math"
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Difficulty Level
              </label>
              <select
                value={courseData.difficulty}
                onChange={(e) => setCourseData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full h-10 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Estimated Hours
              </label>
              <Input
                value={courseData.estimatedHours}
                onChange={(e) => setCourseData(prev => ({ ...prev, estimatedHours: e.target.value }))}
                placeholder="e.g., 20"
                type="number"
                className="bg-slate-700 border-slate-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Course Materials</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive 
                ? "border-violet-500 bg-violet-500/10" 
                : "border-slate-600 hover:border-slate-500"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-100 mb-2">
              Upload Course Materials
            </h3>
            <p className="text-slate-400 mb-4">
              Drag and drop your videos and PDFs here, or click to browse
            </p>
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="gap-2"
              >
                <Video className="h-4 w-4" />
                Upload Videos
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Upload PDFs
              </Button>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="video/*,.pdf"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-slate-100">Uploaded Files ({files.length})</h4>
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {file.type === 'video' ? (
                      <Video className="h-5 w-5 text-pink-400" />
                    ) : (
                      <FileText className="h-5 w-5 text-cyan-400" />
                    )}
                    <div>
                      <p className="font-medium text-slate-100">{file.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{file.size}</span>
                        {file.duration && (
                          <>
                            <span>•</span>
                            <span>{file.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {file.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>
    </div>
  );
}