import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Site } from '../../interfaces/site';
import { getSite as getSiteApi } from '../../lib/hexoApi';

interface SiteState {
  data: Site | null;
  loading: boolean;
  error: string | null;
}

const initialState: SiteState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchSite = createAsyncThunk('site/fetchSite', async () => {
  return await getSiteApi();
});

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSite.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch site';
      });
  },
});

export default siteSlice.reducer;
