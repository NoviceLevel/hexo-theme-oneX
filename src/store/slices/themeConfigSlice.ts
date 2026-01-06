import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ThemeConfig {
  img: {
    avatar: string;
    left_pic: string;
    right_pic: string;
    post_thumbnail: string;
    drawerHeaderBg: string;
  };
  uiux: {
    slogan: string;
    defaultPrimaryColor: string;
    defaultAccentColor: string;
  };
}

interface ThemeConfigState {
  config: ThemeConfig | null;
  loading: boolean;
}

const defaultConfig: ThemeConfig = {
  img: {
    avatar: 'https://www.loliapi.com/acg/',
    left_pic: 'https://www.loliapi.com/acg/',
    right_pic: 'https://www.loliapi.com/acg/',
    post_thumbnail: 'https://www.loliapi.com/acg/',
    drawerHeaderBg: 'https://www.loliapi.com/acg/',
  },
  uiux: {
    slogan: '为美好的世界献上祝福！',
    defaultPrimaryColor: 'cyan',
    defaultAccentColor: 'pink',
  },
};

const initialState: ThemeConfigState = {
  config: defaultConfig,
  loading: false,
};

export const fetchThemeConfig = createAsyncThunk('themeConfig/fetch', async () => {
  try {
    const response = await fetch('/api/site.json');
    const data = await response.json();
    return data.theme || defaultConfig;
  } catch {
    return defaultConfig;
  }
});

const themeConfigSlice = createSlice({
  name: 'themeConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemeConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThemeConfig.fulfilled, (state, action) => {
        state.config = { ...defaultConfig, ...action.payload };
        state.loading = false;
      })
      .addCase(fetchThemeConfig.rejected, (state) => {
        state.config = defaultConfig;
        state.loading = false;
      });
  },
});

export default themeConfigSlice.reducer;
