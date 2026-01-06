import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux';
import promiseMiddleware from './middlewares/promise-middleware';
import reducer from './reducers/reducer';

export default function (data: object = {}) {
  const store = createStore(
    reducer,
    data,
    applyMiddleware(promiseMiddleware)
  );
  return store as Store;
}
