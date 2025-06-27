import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'ghost';
  error?: boolean;
}

export function Input({ className, variant = 'default', error = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        // Base input styles with enhanced accessibility
        'flex h-10 w-full rounded-xl px-3 py-2 text-sm transition-all duration-200 ease-smooth',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Enhanced hover and focus states
        'hover:shadow-soft focus:shadow-medium',
        {
          // Default input - Enhanced light mode contrast
          'border border-gray-300 bg-white placeholder:text-gray-500 text-gray-900 hover:border-gray-400 focus:border-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:text-white dark:hover:border-neutral-500 dark:focus:border-primary-400': variant === 'default',
          
          // Filled input - Alternative style
          'border-0 bg-gray-100 placeholder:text-gray-500 text-gray-900 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:placeholder:text-neutral-400 dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-800': variant === 'filled',
          
          // Ghost input - Minimal styling
          'border-0 bg-transparent placeholder:text-gray-400 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-primary-500 dark:placeholder:text-neutral-500 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800': variant === 'ghost',
        },
        // Error states with enhanced visibility
        error && 'border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-400',
        className
      )}
      {...props}
    />
  );
}