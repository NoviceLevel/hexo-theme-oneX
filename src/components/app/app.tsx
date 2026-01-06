import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import Post from '../post';
import Search from '../search';
import Menu from '../menu';
import Drawer from '../drawer';
import Background from '../background';
import Footer from '../footer';
import BackToTop from '../backToTop';
import { createThemePalette } from '../../lib/themes';
import styles from './app.less';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('themeColor') || 'cyan');

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem('themeColor', color);
  };

  const theme = useMemo(() => createTheme({
    palette: createThemePalette(primaryColor),
  }), [primaryColor]);

  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);
  const handleDrawerClose = () => setSidebarOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background />
      <Menu title="KonoSuba" onMenuClick={handleMenuToggle} />
      <Drawer
        open={sidebarOpen}
        onClose={handleDrawerClose}
        primaryColor={primaryColor}
        onColorChange={handleColorChange}
      />
      <main id={styles.main}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </HashRouter>
        <Footer />
      </main>
      <BackToTop />
    </ThemeProvider>
  );
}
