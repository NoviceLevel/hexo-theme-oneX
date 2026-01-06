import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './background.less';

export default function Background() {
  const theme = useTheme();
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / 2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgImage = themeConfig?.img?.left_pic;

  return (
    <Box
      className={styles.background}
      sx={{
        backgroundColor: theme.palette.primary.main,
        transform: `translateY(${scrollY}px)`,
      }}
    >
      {bgImage && (
        <Box
          className={styles.bgImg}
          sx={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
    </Box>
  );
}
