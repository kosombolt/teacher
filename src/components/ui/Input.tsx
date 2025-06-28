import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'ghost' | 'modern';
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ 
  className, 
  variant = 'modern', 
  error = false, 
  leftIcon,
  rightIcon,
  ...props 
}: InputProps) {
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-neutral-400">
          {leftIcon}
        </div>
      )}
      
      <input
        className={cn(
          // Base modern input styles
          'flex h-11 w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-smooth',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 focus-visible:ring-offset-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Enhanced hover and focus states
          'hover:shadow-soft focus:shadow-medium transform-gpu hover:scale-[1.01] focus:scale-[1.01]',
          // Left padding adjustment for icon
          leftIcon && 'pl-10',
          rightIcon && 'pr-10',
          {
            // Modern variant - Premium glass-morphism style
            'border border-gray-200/60 bg-white/80 backdrop-blur-sm placeholder:text-gray-500 text-gray-900 hover:border-gray-300/80 focus:border-primary-500/60 focus:bg-white shadow-xs hover:shadow-soft focus:shadow-medium dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:placeholder:text-neutral-400 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60 dark:focus:bg-neutral-800': variant === 'modern',
            
            // Default variant - Clean and professional
            'border border-gray-300 bg-white placeholder:text-gray-500 text-gray-900 hover:border-gray-400 focus:border-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:text-white dark:hover:border-neutral-500 dark:focus:border-primary-400': variant === 'default',
            
            // Filled variant - Solid background
            'border-0 bg-gray-100 placeholder:text-gray-500 text-gray-900 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:bg-neutral-700 dark:placeholder:text-neutral-400 dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-800': variant === 'filled',
            
            // Ghost variant - Minimal styling
            'border-0 bg-transparent placeholder:text-gray-400 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-primary-500/20 dark:placeholder:text-neutral-500 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800': variant === 'ghost',
          },
          // Error states with enhanced visibility
          error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-400',
          className
        )}
        {...props}
      />
      
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-neutral-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
}