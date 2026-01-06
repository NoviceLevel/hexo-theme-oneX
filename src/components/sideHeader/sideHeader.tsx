import { Box, Avatar, Typography } from '@mui/material';
import styles from './sideHeader.less';

interface SideHeaderProps {
  avatar?: string;
  name?: string;
  email?: string;
  background?: string;
}

export default function SideHeader({
  avatar = 'https://www.loliapi.com/acg/',
  name = 'KonoSuba',
  email = 'megumin@konosuba.com',
  background = 'https://www.loliapi.com/acg/',
}: SideHeaderProps) {
  return (
    <Box className={styles.sideHeader}>
      <Box className={styles.bg} sx={{ backgroundImage: `url(${background})` }} />
      <Box className={styles.content}>
        <Avatar src={avatar} className={styles.avatar} />
        <Typography className={styles.name}>{name}</Typography>
        <Typography className={styles.email}>{email}</Typography>
      </Box>
    </Box>
  );
}
