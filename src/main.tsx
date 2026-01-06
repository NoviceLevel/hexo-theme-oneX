import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { fetchThemeConfig } from './store/slices/themeConfigSlice';
import { fetchSite } from './store/slices/siteSlice';
import App from './components/app/app';
import './main.less';

store.dispatch(fetchThemeConfig());
store.dispatch(fetchSite());

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
