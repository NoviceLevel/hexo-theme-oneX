import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BackgroundImage {
  url: string;
  key: string;
}

export interface BackgroundState {
  images: BackgroundImage[];
}

const initialState: BackgroundState = {
  images: [],
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackgroundImage: (state, action: PayloadAction<BackgroundImage[]>) => {
      state.images = action.payload;
    },
    addBackgroundImage: (state, action: PayloadAction<BackgroundImage>) => {
      const exists = state.images.find(img => img.key === action.payload.key);
      if (!exists) {
        state.images.push(action.payload);
      } else {
        state.images = state.images.map(img => 
          img.key === action.payload.key ? action.payload : img
        );
      }
    },
  },
});

export const { setBackgroundImage, addBackgroundImage } = backgroundSlice.actions;
export default backgroundSlice.reducer;
