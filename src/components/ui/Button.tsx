import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles with enhanced transitions and accessibility
        'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        // Enhanced hover and active states
        'hover:scale-[1.02] active:scale-[0.98] transform-gpu',
        {
          // Primary button - Enhanced contrast and accessibility
          'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-medium hover:shadow-large hover:from-primary-600 hover:to-secondary-600 focus:shadow-glow dark:shadow-dark-medium dark:hover:shadow-dark-large': variant === 'default',
          
          // Outline button - Improved light mode contrast
          'border-2 border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-50 hover:border-gray-400 hover:shadow-soft focus:border-primary-500 focus:bg-primary-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:border-neutral-500': variant === 'outline',
          
          // Ghost button - Better light mode visibility
          'text-gray-700 hover:bg-gray-100 hover:shadow-xs focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700': variant === 'ghost',
          
          // Secondary button - New variant for better hierarchy
          'bg-gray-100 text-gray-700 shadow-xs hover:bg-gray-200 hover:shadow-soft focus:bg-gray-200 focus:shadow-soft dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600': variant === 'secondary',
          
          // Destructive button - Enhanced error states
          'bg-error-500 text-white shadow-medium hover:bg-error-600 hover:shadow-large focus:shadow-glow dark:shadow-dark-medium': variant === 'destructive',
        },
        {
          // Size variants with improved spacing
          'h-10 px-4 py-2 text-sm': size === 'default',
          'h-8 px-3 py-1.5 text-xs': size === 'sm',
          'h-12 px-6 py-3 text-base': size === 'lg',
          'h-10 w-10 p-0': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}