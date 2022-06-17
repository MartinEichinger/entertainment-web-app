import { configureStore, Action } from '@reduxjs/toolkit';
import mediaReducer from './mediaSlices';
import authReducer from './authSlices';
import genreReducer from './genreSlices';

import logger from './logger';
import toast from './toast';
//TEST
import { ThunkAction } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    medias: mediaReducer,
    auth: authReducer,
    genres: genreReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, toast),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//TEST
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
