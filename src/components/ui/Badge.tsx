import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

export function Badge({ 
  className, 
  variant = 'default', 
  size = 'default',
  children 
}: BadgeProps) {
  return (
    <div className={cn(
      // Base badge styles with enhanced typography
      'inline-flex items-center rounded-full font-medium transition-all duration-200 ease-smooth',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      {
        // Size variants with improved spacing
        'px-2 py-0.5 text-xs': size === 'sm',
        'px-2.5 py-0.5 text-xs': size === 'default',
        'px-3 py-1 text-sm': size === 'lg',
      },
      {
        // Primary badge - Enhanced contrast
        'border-transparent bg-primary-500 text-white shadow-soft hover:shadow-medium dark:shadow-dark-soft': variant === 'default',
        
        // Secondary badge - Better light mode visibility
        'border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600': variant === 'secondary',
        
        // Outline badge - Enhanced border contrast
        'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-neutral-600 dark:text-neutral-300 dark:bg-transparent dark:hover:bg-neutral-800': variant === 'outline',
        
        // Success badge - WCAG compliant colors
        'border-transparent bg-success-500 text-white shadow-soft': variant === 'success',
        
        // Warning badge - Enhanced visibility
        'border-transparent bg-warning-500 text-white shadow-soft': variant === 'warning',
        
        // Error badge - High contrast
        'border-transparent bg-error-500 text-white shadow-soft': variant === 'error',
        
        // Ghost badge - Subtle styling
        'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-800': variant === 'ghost',
      },
      className
    )}>
      {children}
    </div>
  );
}