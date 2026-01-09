import { Box, Typography } from '@mui/material';
import styles from './loading.less';

interface LoadingProps {
  show?: boolean;
  text?: string;
  inline?: boolean;
}

function MagicCircle() {
  return (
    <div className={styles.magicCircle}>
      <div className={styles.outerRing} />
      <div className={styles.innerRing} />
      <div className={styles.core} />
    </div>
  );
}

export default function Loading({ show = false, text, inline = false }: LoadingProps) {
  if (inline) {
    return (
      <Box className={styles.inlineContainer}>
        <MagicCircle />
        {text && <Typography className={styles.inlineText}>{text}</Typography>}
      </Box>
    );
  }

  if (!show) return null;

  return (
    <Box className={styles.fullscreen}>
      <MagicCircle />
      <Typography className={styles.fullscreenText}>Explosion!</Typography>
    </Box>
  );
}
