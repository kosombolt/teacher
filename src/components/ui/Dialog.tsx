import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DialogContent({ className, children }: DialogContentProps) {
  return (
    <div className={cn(
      "bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-6 animate-in fade-in-0 zoom-in-95 duration-200",
      className
    )}>
      {children}
    </div>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return (
    <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
      {children}
    </div>
  );
}

interface DialogTitleProps {
  children: React.ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return (
    <h2 className="text-lg font-semibold text-slate-100">
      {children}
    </h2>
  );
}

interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function DialogTrigger({ children, onClick }: DialogTriggerProps) {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
}