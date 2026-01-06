import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { hexToRgba } from '../../lib/utils';
import styles from './menu.less';

interface MenuProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function Menu({ title = '', onMenuClick }: MenuProps) {
  const [opacity, setOpacity] = useState(0);
  const theme = useTheme();
  const opacityHeight = 200;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newOpacity = Math.min(scrollTop / opacityHeight, 1);
      setOpacity(newOpacity);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundColor = hexToRgba(theme.palette.primary.main, opacity);
  const shadowOpacity = 0.117647 * opacity;

  return (
    <div className={styles.menu}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor,
          boxShadow: `0px 1px 6px rgba(0, 0, 0, ${shadowOpacity}), 0px 1px 4px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
