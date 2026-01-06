import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/home';
import './app.less';

interface AppProps {
  muiTheme?: Theme;
}

const defaultTheme = createTheme();

export default function App({ muiTheme }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme || defaultTheme}>
      <CssBaseline />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  );
}
