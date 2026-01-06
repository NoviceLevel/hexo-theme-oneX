import { red, cyan, pink, grey } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

export const colorPalettes: Record<string, ThemeOptions['palette']> = {
  red: {
    primary: { main: red[500], dark: red[700] },
    secondary: { main: red['A200'] },
  },
  cyan: {
    primary: { main: cyan[500], dark: cyan[700] },
    secondary: { main: cyan[500] },
  },
  pink: {
    primary: { main: pink[500], dark: pink[700] },
    secondary: { main: pink['A200'] },
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
