import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      {
        'border-transparent bg-primary-500 text-white shadow-soft': variant === 'default',
        'border-transparent bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300': variant === 'secondary',
        'text-neutral-700 border-neutral-300 dark:text-neutral-300 dark:border-neutral-600': variant === 'outline',
      },
      className
    )}>
      {children}
    </div>
  );
}