import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { hexToRgba } from '../../lib/utils';
import { RootState } from '../../store';
import styles from './menu.less';

interface MenuProps {
  onMenuClick?: () => void;
}

export default function Menu({ onMenuClick }: MenuProps) {
  const [opacity, setOpacity] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastScrollTop = useRef(0);
  const theme = useTheme();
  const headerHeight = 228;
  const appBarHeight = 64;

  const navTitle = useSelector((state: RootState) => state.nav.title);
  const backButton = useSelector((state: RootState) => state.nav.backButton);
  const fullModel = useSelector((state: RootState) => state.nav.fullModel);

  useEffect(() => {
    if (fullModel) {
      setOpacity(1);
      setHidden(false);
      const handleScrollTop = () => {
        setAtTop(window.scrollY < 10);
      };
      handleScrollTop();
      window.addEventListener('scroll', handleScrollTop, { passive: true });
      return () => window.removeEventListener('scroll', handleScrollTop);
    }

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const threshold = headerHeight - appBarHeight;
        setAtTop(scrollTop < 10);
        
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
  }, [fullModel]);

  const backgroundColor = hexToRgba(theme.palette.primary.main, fullModel ? 1 : opacity);
  const shadowOpacity = atTop ? 0 : 0.117647 * (fullModel ? 1 : opacity);

  const handleSearchClick = () => {
    window.location.hash = '/search';
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleLeftClick = () => {
    if (backButton) {
      handleBackClick();
    } else {
      onMenuClick?.();
    }
  };

  return (
    <div className={styles.menu} style={{ top: hidden ? -appBarHeight : 0 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor,
          boxShadow: `0px 1px 6px rgba(0, 0, 0, ${shadowOpacity}), 0px 1px 4px rgba(0, 0, 0, ${shadowOpacity})`,
          transition: 'top 0.3s ease, box-shadow 0.3s ease',
          top: hidden ? -appBarHeight : 0,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label={backButton ? 'back' : 'menu'}
            sx={{ mr: 2, color: '#fff' }}
            onClick={handleLeftClick}
          >
            {backButton ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              opacity: (fullModel || opacity > 0.5) ? 1 : 0,
              transition: 'opacity 0.3s ease',
              color: '#fff',
            }}
          >
            {navTitle}
          </Typography>
          <IconButton sx={{ color: '#fff' }} onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
