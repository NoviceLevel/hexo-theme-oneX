import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface MenuItemI {
  title: string;
  type: string;
  href?: string;
  name?: string;
  icon?: string | { type: string; date: string; style?: Record<string, string>; viewBox?: string };
  nested?: MenuItemI[];
  items?: MenuItemI[];
  initiallyOpen?: boolean;
}

export interface BarMenu {
  icon: string;
  items: MenuItemI[];
}

interface ThemeConfig {
  head?: {
    favicon?: string | string[];
  };
  img: {
    avatar: string | string[];
    left_pic: string | string[];
    right_pic: string | string[];
    post_thumbnail: string | string[];
    drawerHeaderBg: string | string[];
  };
  uiux: {
    slogan: string | string[];
    defaultPrimaryColor: string;
    defaultAccentColor: string;
    loading?: boolean;
    loadingText?: string;
    backToTop?: boolean;
    scrollbar?: boolean;
    toc?: boolean;
    searchPlaceholder?: string;
    notFoundText?: string;
  };
  comment?: {
    disqus?: {
      shortName?: string;
    };
  };
  drawer?: MenuItemI[];
  Drawer?: MenuItemI[];
  footer?: [string, string | string[]];
  colorPicker?: boolean;
  homeToolBar?: BarMenu[];
}

export interface ThemeConfigState {
  config: ThemeConfig | null;
  loading: boolean;
}

const defaultConfig: ThemeConfig = {
  head: {
    favicon: '',
  },
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
  homeToolBar: [],
};

const initialState: ThemeConfigState = {
  config: defaultConfig,
  loading: false,
};

export const fetchThemeConfig = createAsyncThunk('themeConfig/fetch', async () => {
  try {
    const response = await fetch('/api/theme.json');
    const data = await response.json();
    return data || defaultConfig;
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
        const payload = action.payload;
        state.config = {
          head: payload.head,
          img: payload.img || defaultConfig.img,
          uiux: payload.uiux || defaultConfig.uiux,
          comment: payload.comment,
          drawer: payload.drawer,
          Drawer: payload.Drawer,
          footer: payload.footer,
          colorPicker: payload.colorPicker,
          homeToolBar: payload.homeToolBar || [],
        };
        state.loading = false;
      })
      .addCase(fetchThemeConfig.rejected, (state) => {
        state.config = defaultConfig;
        state.loading = false;
      });
  },
});

export default themeConfigSlice.reducer;
