import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './loading.less';

interface LoadingProps {
  show: boolean;
}

export default function Loading({ show }: LoadingProps) {
  const theme = useTheme();
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const loadingText = themeConfig?.uiux?.loadingText || '正在施放爆裂魔法...';

  if (!show) return null;

  return (
    <Box className={styles.container} sx={{ backgroundColor: theme.palette.primary.main }}>
      <Box className={styles.content}>
        <Box className={styles.magicCircle}>
          <Box className={styles.circleOuter} />
          <Box className={styles.circleInner} />
          <Box className={styles.star} />
        </Box>
        <Typography className={styles.text}>
          Explosion!
        </Typography>
        <Typography className={styles.subtext}>
          {loadingText}
        </Typography>
      </Box>
    </Box>
  );
}
