import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Posts } from '../../interfaces/posts';
import { getPosts as getPostsApi } from '../../lib/hexoApi';

export interface PostsState {
  data: Posts | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ index, href }: { index?: number; href?: string } = {}) => {
    return await getPostsApi(index, href);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;
