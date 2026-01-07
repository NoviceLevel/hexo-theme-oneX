import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost as fetchPost, getPage as fetchPage } from '../../lib/hexoApi';
import { Post } from '../../interfaces';

export interface PostState {
  posts: Record<string, Post & { loading?: boolean; error?: boolean }>;
}

const initialState: PostState = {
  posts: {},
};

export const loadPost = createAsyncThunk(
  'post/loadPost',
  async (slug: string) => {
    const post = await fetchPost(slug);
    return { slug, post };
  }
);

export const loadPage = createAsyncThunk(
  'post/loadPage',
  async (title: string) => {
    const page = await fetchPage(title);
    return { slug: title, post: page };
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPost.pending, (state, action) => {
        state.posts[action.meta.arg] = {
          ...state.posts[action.meta.arg],
          loading: true,
          error: false,
        };
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.posts[action.payload.slug] = {
          ...action.payload.post,
          loading: false,
          error: false,
        };
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.posts[action.meta.arg] = {
          ...state.posts[action.meta.arg],
          loading: false,
          error: true,
        };
      })
      .addCase(loadPage.pending, (state, action) => {
        state.posts[action.meta.arg] = {
          ...state.posts[action.meta.arg],
          loading: true,
          error: false,
        };
      })
      .addCase(loadPage.fulfilled, (state, action) => {
        state.posts[action.payload.slug] = {
          ...action.payload.post,
          loading: false,
          error: false,
        };
      })
      .addCase(loadPage.rejected, (state, action) => {
        state.posts[action.meta.arg] = {
          ...state.posts[action.meta.arg],
          loading: false,
          error: true,
        };
      });
  },
});

export default postSlice.reducer;
