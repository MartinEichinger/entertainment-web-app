import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlices';
import authReducer from './authSlices';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
