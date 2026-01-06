import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import Post from '../post';
import Search from '../search';
import Category from '../category';
import Categories from '../categories';
import Tag from '../tag';
import Tags from '../tags';
import Page from '../page';
import NotFound from '../notFound';
import Loading from '../loading';
import Menu from '../menu';
import Drawer from '../drawer';
import Background from '../background';
import Footer from '../footer';
import BackToTop from '../backToTop';
import Header from '../header';
import { createThemePalette } from '../../lib/themes';
import styles from './app.less';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('themeColor') || 'cyan');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
      <Loading show={loading} />
      <Header />
      <Background />
      <Menu onMenuClick={handleMenuToggle} />
      <Drawer
        open={sidebarOpen}
        onClose={handleDrawerClose}
        primaryColor={primaryColor}
        onColorChange={handleColorChange}
      />
      <main className={styles.main}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tag/:name" element={<Tag />} />
            <Route path="/page/:title" element={<Page />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
        <Footer />
      </main>
      <BackToTop />
    </ThemeProvider>
  );
}
