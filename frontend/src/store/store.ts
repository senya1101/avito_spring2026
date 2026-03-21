import { configureStore } from '@reduxjs/toolkit';
import { adsApi } from '@api/adsApi';

export const store = configureStore({
  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adsApi.middleware),
});
