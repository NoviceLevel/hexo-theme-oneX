import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import postsReducer from './slices/postsSlice';
import siteReducer from './slices/siteSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postsReducer,
    site: siteReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
