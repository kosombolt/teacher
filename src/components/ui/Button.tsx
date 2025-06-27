import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
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
        'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-sm hover:shadow-md': variant === 'default',
          'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:border-blue-gray-600 dark:text-gray-300 dark:hover:bg-blue-gray-700 dark:hover:border-blue-gray-500': variant === 'outline',
          'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-blue-gray-700': variant === 'ghost',
        },
        {
          'h-10 py-2 px-4': size === 'default',
          'h-8 px-3 text-xs': size === 'sm',
          'h-12 px-8': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}