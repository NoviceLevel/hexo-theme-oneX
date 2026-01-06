import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './background.less';

export default function Background() {
  const theme = useTheme();

  return (
    <Box
      className={styles.background}
      sx={{ backgroundColor: theme.palette.primary.main }}
    />
  );
}
