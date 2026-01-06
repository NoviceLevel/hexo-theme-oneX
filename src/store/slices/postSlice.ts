import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost as fetchPost } from '../../lib/hexoApi';
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
      });
  },
});

export default postSlice.reducer;
