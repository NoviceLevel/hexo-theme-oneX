import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';
import styles from './footer.less';

export default function Footer() {
  const theme = useTheme();
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);

  const footerConfig = themeConfig?.footer;
  const copyright = footerConfig?.[0] || `© ${new Date().getFullYear()} ${site?.title || 'KonoSuba'}`;
  const sloganArray = footerConfig?.[1];
  const slogan = Array.isArray(sloganArray) ? arrayRand(sloganArray) : (sloganArray || 'Explosion!');

  return (
    <Box className={styles.footer}>
      <Box
        className={styles.footerCanve}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        }}
      >
        <Box className={styles.grid}>
          <Typography component="p" className={styles.s1}>
            <span>Powered by </span>
            <Link href="https://hexo.io" target="_blank" color="inherit" underline="hover">Hexo</Link>
            <br />
            <span>Theme - </span>
            <Link href="https://github.com/NoviceLevel/hexo-theme-oneX" target="_blank" color="inherit" underline="hover">oneX</Link>
          </Typography>
          <Typography component="span" className={styles.s2}>{copyright}</Typography>
          <Typography component="p" className={styles.s3}>{slogan}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
