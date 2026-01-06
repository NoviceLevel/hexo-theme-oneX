import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { Store } from 'redux';
import createStore from './create-store';
import App from './components/app/app';
import './main.less';

const store = createStore({});

const Main = ({ store }: { store: Store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<Main store={store} />);
}
