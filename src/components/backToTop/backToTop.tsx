import { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Fab
        size="medium"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          backgroundColor: theme.palette.primary.main + '20',
          color: theme.palette.primary.main,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.primary.main}40`,
          '&:hover': {
            backgroundColor: theme.palette.primary.main + '30',
            boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
