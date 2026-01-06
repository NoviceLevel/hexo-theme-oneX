import { useState, useEffect } from 'react';
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
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      setScrollY(window.scrollY / 2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const currentBgImage = backgroundImages.length > 0 
    ? backgroundImages[backgroundImages.length - 1].url 
    : arrayRand(themeConfig?.img?.left_pic);

  return (
    <Box
      className={styles.background}
      sx={{
        backgroundColor: theme.palette.primary.main,
        transform: isMobile ? `translateY(${scrollY}px)` : 'none',
      }}
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
