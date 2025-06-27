import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  className?: string;
  children: React.ReactNode;
}

export function Avatar({ className, children }: AvatarProps) {
  return (
    <div className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}>
      {children}
    </div>
  );
}

export function AvatarImage({ className, src, alt }: { className?: string; src: string; alt?: string }) {
  return (
    <img 
      className={cn('aspect-square h-full w-full', className)} 
      src={src} 
      alt={alt} 
    />
  );
}

export function AvatarFallback({ className, children }: AvatarProps) {
  return (
    <div className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-slate-600 text-slate-200',
      className
    )}>
      {children}
    </div>
  );
}