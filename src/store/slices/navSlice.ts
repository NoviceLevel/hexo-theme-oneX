import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavState {
  title: string;
  backButton: boolean;
  fullModel: boolean;
}

const initialState: NavState = {
  title: '',
  backButton: false,
  fullModel: false,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setNavTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setBackButton: (state, action: PayloadAction<boolean>) => {
      state.backButton = action.payload;
    },
    setFullModel: (state, action: PayloadAction<boolean>) => {
      state.fullModel = action.payload;
    },
  },
});

export const { setNavTitle, setBackButton, setFullModel } = navSlice.actions;
export default navSlice.reducer;
