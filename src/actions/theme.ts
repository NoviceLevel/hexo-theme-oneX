import { Theme } from '@mui/material/styles';

export interface ChangeThemeAction {
  type: 'CHANGE_THEME';
  muiTheme: Theme;
}

export const changeTheme = (muiTheme: Theme): ChangeThemeAction => ({
  type: 'CHANGE_THEME',
  muiTheme
});
