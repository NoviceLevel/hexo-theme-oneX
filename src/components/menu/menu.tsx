import { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { hexToRgba } from '../../lib/utils';
import styles from './menu.less';

interface MenuProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function Menu({ title = '', onMenuClick }: MenuProps) {
  const [opacity, setOpacity] = useState(0);
  const [hidden, setHidden] = useState(false);
  const lastScrollTop = useRef(0);
  const theme = useTheme();
  const headerHeight = 228;
  const appBarHeight = 64;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const threshold = headerHeight - appBarHeight;
        
        if (scrollTop < threshold) {
          setOpacity(0);
          setHidden(false);
        } else if (scrollTop < headerHeight) {
          setOpacity(0);
          setHidden(false);
        } else {
          setOpacity(1);
          if (scrollTop > lastScrollTop.current && scrollTop > headerHeight) {
            setHidden(true);
          } else if (scrollTop < lastScrollTop.current) {
            setHidden(false);
          }
        }
        lastScrollTop.current = scrollTop;
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundColor = hexToRgba(theme.palette.primary.main, opacity);
  const shadowOpacity = 0.117647 * opacity;

  const handleSearchClick = () => {
    window.location.hash = '/search';
  };

  return (
    <div className={styles.menu} style={{ top: hidden ? -appBarHeight : 0 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor,
          boxShadow: `0px 1px 6px rgba(0, 0, 0, ${shadowOpacity}), 0px 1px 4px rgba(0, 0, 0, ${shadowOpacity})`,
          transition: 'top 0.3s ease',
          top: hidden ? -appBarHeight : 0,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: '#fff' }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              opacity: opacity > 0.5 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              color: '#fff',
            }}
          >
            {title}
          </Typography>
          <IconButton sx={{ color: '#fff' }} onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
