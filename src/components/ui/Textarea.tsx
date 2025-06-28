import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled' | 'ghost' | 'modern';
  error?: boolean;
}

export function Textarea({ 
  className, 
  variant = 'modern', 
  error = false,
  ...props 
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        // Base modern textarea styles
        'flex min-h-[100px] w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-smooth resize-none',
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Enhanced hover and focus states
        'hover:shadow-soft focus:shadow-medium transform-gpu hover:scale-[1.005] focus:scale-[1.005]',
        {
          // Modern variant - Premium glass-morphism style
          'border border-gray-200/60 bg-white/80 backdrop-blur-sm placeholder:text-gray-500 text-gray-900 hover:border-gray-300/80 focus:border-primary-500/60 focus:bg-white shadow-xs hover:shadow-soft focus:shadow-medium dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:placeholder:text-neutral-400 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60 dark:focus:bg-neutral-800': variant === 'modern',
          
          // Default variant - Clean and professional
          'border border-gray-300 bg-white placeholder:text-gray-500 text-gray-900 focus:border-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:text-white dark:focus:border-primary-400': variant === 'default',
          
          // Filled variant - Solid background
          'border-0 bg-gray-100 placeholder:text-gray-500 text-gray-900 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:bg-neutral-700 dark:placeholder:text-neutral-400 dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-800': variant === 'filled',
          
          // Ghost variant - Minimal styling
          'border-0 bg-transparent placeholder:text-gray-400 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-primary-500/20 dark:placeholder:text-neutral-500 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800': variant === 'ghost',
        },
        // Error states
        error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-400',
        className
      )}
      {...props}
    />
  );
}