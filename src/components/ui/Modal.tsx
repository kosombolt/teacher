import React, { useEffect } from 'react';
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
  // Enhanced accessibility - trap focus and handle escape key
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced backdrop with smooth transitions */}
      <div 
        className={cn(
          "fixed inset-0 transition-all duration-300 ease-smooth",
          "bg-black/50 backdrop-blur-sm",
          // Enhanced backdrop for light mode
          "dark:bg-black/70"
        )}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      
      {/* Modal Content with enhanced animations */}
      <div className={cn(
        "relative z-50 w-full max-w-4xl max-h-[90vh] overflow-hidden",
        // Enhanced styling for light mode
        "bg-white dark:bg-neutral-900",
        "border border-gray-200 dark:border-neutral-700",
        "rounded-2xl shadow-xl dark:shadow-dark-large",
        // Smooth entrance animation
        "animate-scale-in",
        // Enhanced focus management
        "focus:outline-none",
        className
      )}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      >
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
    <div className={cn(
      "flex items-center justify-between p-6",
      // Enhanced border styling
      "border-b border-gray-200 dark:border-neutral-700"
    )}>
      <div className="flex-1">
        {children}
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={cn(
            "h-8 w-8 ml-4",
            // Enhanced close button styling
            "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            "dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
          )}
          aria-label="Close modal"
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
    <div className={cn(
      "overflow-y-auto max-h-[calc(90vh-120px)]",
      // Enhanced scrollbar styling
      "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
      "dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-neutral-800",
      className
    )}>
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
      "flex items-center justify-end gap-3 p-6",
      // Enhanced border styling
      "border-t border-gray-200 dark:border-neutral-700",
      // Enhanced background for better separation
      "bg-gray-50 dark:bg-neutral-800/50",
      className
    )}>
      {children}
    </div>
  );
}