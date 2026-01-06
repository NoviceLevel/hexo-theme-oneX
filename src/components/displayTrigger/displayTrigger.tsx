import { useEffect, useRef, ReactNode, useCallback } from 'react';

interface DisplayTriggerProps {
  onDisplay: () => void;
  children?: ReactNode;
  className?: string;
}

export default function DisplayTrigger({ onDisplay, children, className }: DisplayTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const onDisplayRef = useRef(onDisplay);
  
  useEffect(() => {
    onDisplayRef.current = onDisplay;
  }, [onDisplay]);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onDisplayRef.current();
        }
      },
      { threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={triggerRef} className={className}>{children}</div>;
}
