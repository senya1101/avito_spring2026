import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adsApi } from '@api/adsApi';
import adsReducer from './slices/adsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

const rootReducer = combineReducers({
  [adsApi.reducerPath]: adsApi.reducer,
  ads: adsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
