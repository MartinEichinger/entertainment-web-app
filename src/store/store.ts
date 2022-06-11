import { configureStore, Action } from '@reduxjs/toolkit';
import movieReducer from './movieSlices';
import authReducer from './authSlices';
import logger from './logger';
import toast from './toast';
//TEST
import { ThunkAction } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, toast),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//TEST
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
