import { useState, useEffect, useRef } from 'react';
import { Fab, Zoom, useMediaQuery } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);
  const theme = useTheme();
  const footerHeight = useRef(100);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
      
      const footer = document.querySelector('footer');
      if (footer) {
        footerHeight.current = footer.offsetHeight;
      }
      
      const scrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      const threshold = isMobile ? footerHeight.current + 16 : footerHeight.current + 60;
      const baseOffset = isMobile ? 12 : 24;
      
      if (scrollBottom < threshold) {
        setBottomOffset(footerHeight.current - scrollBottom + (isMobile ? 16 : 60));
      } else {
        setBottomOffset(baseOffset);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

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
          bottom: bottomOffset,
          right: isMobile ? 16 : 24,
          zIndex: 1000,
          backgroundColor: theme.palette.primary.main + '20',
          color: theme.palette.primary.main,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.primary.main}40`,
          transition: 'bottom 0.2s ease, background-color 0.2s ease',
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
