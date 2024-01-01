import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../state/reducer';

const persistConfig:any = {
  key: 'root',
  storage: storage,
  whitelist: ['currentUser']
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
//  composeWithDevTools(applyMiddleware(logger))
);

export const persistor = persistStore(store);
