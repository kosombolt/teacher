import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-xl border px-3 py-2 text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-soft focus:shadow-medium',
        'border-neutral-300 bg-white placeholder:text-neutral-500 text-neutral-900 focus:border-primary-500',
        'dark:border-neutral-600 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:text-white dark:focus:border-primary-400',
        className
      )}
      {...props}
    />
  );
}