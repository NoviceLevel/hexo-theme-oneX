import { Middleware } from 'redux';

interface PromiseAction {
  promise?: () => Promise<unknown>;
  types?: [string, string, string];
  type?: string;
  [key: string]: unknown;
}

const promiseMiddleware: Middleware = (store) => (next) => (action) => {
  const promiseAction = action as PromiseAction;
  const { promise, types, ...rest } = promiseAction;

  if (!promise) {
    return next(action);
  }

  if (!types) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...rest, type: REQUEST });

  return promise().then(
    (result: unknown) => {
      next({ ...rest, result, type: SUCCESS });
    },
    (error: unknown) => {
      next({ ...rest, error, type: FAILURE });
    }
  );
};

export default promiseMiddleware;
