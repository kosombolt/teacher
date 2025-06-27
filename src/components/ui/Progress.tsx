import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={cn("w-full bg-slate-700 rounded-full h-2", className)}>
      <div 
        className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}