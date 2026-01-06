import { useEffect, useRef, ReactNode } from 'react';

interface DisplayTriggerProps {
  onDisplay: () => void;
  children?: ReactNode;
}

export default function DisplayTrigger({ onDisplay, children }: DisplayTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          onDisplay();
          hasTriggeredRef.current = true;
        } else if (!entry.isIntersecting) {
          hasTriggeredRef.current = false;
        }
      },
      { threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [onDisplay]);

  return <div ref={triggerRef}>{children}</div>;
}
