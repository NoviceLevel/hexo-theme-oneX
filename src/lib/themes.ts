import { red, cyan, pink, grey, blue, amber, purple, green, deepPurple, lightBlue, yellow, orange } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

export const colorPalettes: Record<string, ThemeOptions['palette']> = {
  cyan: {
    primary: { main: cyan[500], dark: cyan[700] },
    secondary: { main: cyan[500] },
  },
  red: {
    primary: { main: red[500], dark: red[700] },
    secondary: { main: red['A200'] },
  },
  pink: {
    primary: { main: pink[500], dark: pink[700] },
    secondary: { main: pink['A200'] },
  },
  aqua: {
    primary: { main: '#00BFFF', dark: '#0099CC' },
    secondary: { main: lightBlue[300] },
  },
  megumin: {
    primary: { main: '#8B0000', dark: '#5C0000' },
    secondary: { main: red[900] },
  },
  darkness: {
    primary: { main: '#FFD700', dark: '#B8860B' },
    secondary: { main: amber[600] },
  },
  kazuma: {
    primary: { main: '#228B22', dark: '#006400' },
    secondary: { main: green[700] },
  },
  eris: {
    primary: { main: '#9370DB', dark: '#7B68EE' },
    secondary: { main: purple[300] },
  },
  wiz: {
    primary: { main: '#4B0082', dark: '#2E0854' },
    secondary: { main: deepPurple[700] },
  },
  yunyun: {
    primary: { main: '#FF69B4', dark: '#FF1493' },
    secondary: { main: pink[300] },
  },
  chomusuke: {
    primary: { main: '#2F4F4F', dark: '#1C1C1C' },
    secondary: { main: grey[800] },
  },
};

export function createThemePalette(primaryColor: string, accentColor?: string): ThemeOptions['palette'] {
  const primary = colorPalettes[primaryColor] || colorPalettes.cyan;
  const accent = colorPalettes[accentColor || primaryColor] || primary;
  return {
    ...primary,
    secondary: accent?.secondary || primary?.secondary,
  };
}
