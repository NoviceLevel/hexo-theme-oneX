import { useState } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import Post from '../post';
import Menu from '../menu';
import Drawer from '../drawer';
import styles from './app.less';

interface AppProps {
  muiTheme?: Theme;
}

const defaultTheme = createTheme();

export default function App({ muiTheme }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);
  const handleDrawerClose = () => setSidebarOpen(false);

  return (
    <ThemeProvider theme={muiTheme || defaultTheme}>
      <CssBaseline />
      <Menu title="KonoSuba" onMenuClick={handleMenuToggle} />
      <Drawer open={sidebarOpen} onClose={handleDrawerClose} />
      <main id={styles.main}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
          </Routes>
        </HashRouter>
      </main>
    </ThemeProvider>
  );
}
