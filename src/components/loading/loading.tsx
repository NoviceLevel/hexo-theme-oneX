import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './loading.less';

interface LoadingProps {
  show: boolean;
}

export default function Loading({ show }: LoadingProps) {
  const theme = useTheme();

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
          正在施放爆裂魔法...
        </Typography>
      </Box>
    </Box>
  );
}
