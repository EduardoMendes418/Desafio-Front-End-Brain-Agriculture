import { configureStore } from '@reduxjs/toolkit';
import farmersReducer from './slices/farmersSlice';

export const store = configureStore({
  reducer: {
    farmers: farmersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;