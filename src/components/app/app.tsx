import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import styles from './app.less';

interface AppProps {
  muiTheme?: Theme;
}

const defaultTheme = createTheme();

export default function App({ muiTheme }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme || defaultTheme}>
      <CssBaseline />
      <main id={styles.main}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </HashRouter>
      </main>
    </ThemeProvider>
  );
}
