import { useState, useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';
import styles from './background.less';

export default function Background() {
  const theme = useTheme();
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const backgroundImages = useSelector((state: RootState) => state.background.images);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile || !bgRef.current) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.5}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const currentBgImage = backgroundImages.length > 0 
    ? backgroundImages[backgroundImages.length - 1].url 
    : arrayRand(themeConfig?.img?.left_pic);

  return (
    <Box
      ref={bgRef}
      className={styles.background}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      {currentBgImage && (
        <Box
          className={styles.bgImg}
          sx={{ backgroundImage: `url(${currentBgImage})` }}
        />
      )}
    </Box>
  );
}
