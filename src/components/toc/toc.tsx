import { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './toc.less';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  content?: string;
}

function extractHeadings(html: string): TocItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  return Array.from(headings).map((heading, index) => ({
    id: heading.id || `heading-${index}`,
    text: heading.textContent || '',
    level: parseInt(heading.tagName[1]),
  }));
}

export default function Toc({ content }: TocProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (content) {
      setHeadings(extractHeadings(content));
    }
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
        for (let i = headingElements.length - 1; i >= 0; i--) {
          const el = headingElements[i];
          if (el && el.getBoundingClientRect().top <= 100) {
            setActiveId(headings[i].id);
            ticking = false;
            return;
          }
        }
        if (headings.length > 0) setActiveId(headings[0].id);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <Box className={styles.toc}>
      <Typography variant="subtitle2" sx={{ p: '3px 20px', fontWeight: 'bold', color: '#333' }}>目录</Typography>
      {headings.map((item) => (
        <Box 
          key={item.id} 
          className={activeId === item.id ? styles.active : ''}
          sx={{ pl: (item.level - 1) * 1.5 }}
        >
          <a
            className={styles.tocLink}
            onClick={() => handleClick(item.id)}
          >
            {item.text}
          </a>
        </Box>
      ))}
    </Box>
  );
}
