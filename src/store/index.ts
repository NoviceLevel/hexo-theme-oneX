import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import postsReducer from './slices/postsSlice';
import siteReducer from './slices/siteSlice';
import postReducer from './slices/postSlice';
import themeConfigReducer from './slices/themeConfigSlice';
import backgroundReducer from './slices/backgroundSlice';
import navReducer from './slices/navSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postsReducer,
    site: siteReducer,
    post: postReducer,
    themeConfig: themeConfigReducer,
    background: backgroundReducer,
    nav: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
