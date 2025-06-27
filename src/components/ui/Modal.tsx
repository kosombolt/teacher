import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, children, className }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal Content */}
      <div className={cn(
        "relative z-50 w-full max-w-4xl max-h-[90vh] overflow-hidden",
        "bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700",
        "rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300",
        className
      )}>
        {children}
      </div>
    </div>
  );
}

interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700">
      <div className="flex-1">
        {children}
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={cn("overflow-y-auto max-h-[calc(90vh-120px)]", className)}>
      {children}
    </div>
  );
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn(
      "flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-neutral-700",
      className
    )}>
      {children}
    </div>
  );
}