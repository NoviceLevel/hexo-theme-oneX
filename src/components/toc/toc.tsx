import { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
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
    <Paper className={styles.toc} elevation={1}>
      <Typography variant="subtitle2" sx={{ p: 1, fontWeight: 'bold' }}>目录</Typography>
      <List dense disablePadding>
        {headings.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeId === item.id}
              onClick={() => handleClick(item.id)}
              sx={{ pl: item.level }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  noWrap: true,
                  fontSize: item.level <= 2 ? '0.875rem' : '0.75rem',
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
