import { Theme } from '@mui/material/styles';

export interface ThemeState {
  muiTheme?: Theme;
}

interface ThemeAction {
  type: string;
  muiTheme?: Theme;
}

const initialState: ThemeState = {};

export const theme = (state: ThemeState = initialState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        muiTheme: action.muiTheme
      };
    default:
      return state;
  }
};
