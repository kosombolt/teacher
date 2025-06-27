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
        'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-medium hover:shadow-large hover:scale-105 active:scale-95': variant === 'default',
          'border border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-medium dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:border-neutral-500': variant === 'outline',
          'text-neutral-700 hover:bg-neutral-100 hover:shadow-soft dark:text-neutral-300 dark:hover:bg-neutral-700': variant === 'ghost',
        },
        {
          'h-10 py-2 px-4': size === 'default',
          'h-8 px-3 text-xs': size === 'sm',
          'h-12 px-8 text-base': size === 'lg',
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