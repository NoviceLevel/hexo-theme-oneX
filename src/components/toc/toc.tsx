import { useState, useEffect } from 'react';
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
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveId(headings[i].id);
          return;
        }
      }
      if (headings.length > 0) setActiveId(headings[0].id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
