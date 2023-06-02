import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { rootReducer } from './reducer';
import api, {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
  // @ts-ignore
} from './middleware/api/api.js';

const browserHistory = createBrowserHistory();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: browserHistory,
  });

export const configureAppStore = () => {
  return configureStore({
    // configures Redux DevTools automatically
    reducer: rootReducer(routerReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            apiCallBegan.type,
            apiCallSuccess.type,
            apiCallFailed.type,
          ],
          ignoredPaths: ['oidc.user'], // ref this https://github.com/maxmantz/redux-oidc/issues/169
        },
      })
        .concat(routerMiddleware)
        .concat(api),
  });
};
const store = configureAppStore();
const history = createReduxHistory(store);

export { store, history };
