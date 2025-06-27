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
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600': variant === 'default',
          'border border-slate-600 text-slate-300 hover:bg-slate-800': variant === 'outline',
          'text-slate-300 hover:bg-slate-800': variant === 'ghost',
        },
        {
          'h-10 py-2 px-4': size === 'default',
          'h-9 px-3 text-xs': size === 'sm',
          'h-11 px-8': size === 'lg',
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