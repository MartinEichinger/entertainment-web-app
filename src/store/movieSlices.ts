import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IMovies } from './api';

const debug = true;
//const baseURL = process.env.REACT_APP_BACKEND_PATH;
const removeURL = process.env.REACT_APP_STATIC_REMOVE;

interface movieState {
  loading: boolean;
  nowPlayingMovies: any[] | IMovies[];
  popularMovies: any[] | IMovies[];
  topRatedMovies: any[] | IMovies[];
  upcomingMovies: any[] | IMovies[];
}

interface payloadProps {
  movies: IMovies[];
  type: string;
}

// initial state
const initialState: movieState = {
  loading: false,
  nowPlayingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
};

// create slice
export const slice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // onStart
    moviesRequested: (state) => {
      state.loading = true;
    },
    movieUpdateStart: (state) => {
      state.loading = true;
    },
    movieCreateStart: (state) => {
      state.loading = true;
    },
    movieDeleteStart: (state) => {
      state.loading = true;
    },

    // onSuccess
    moviesReceived: (state, action: PayloadAction<payloadProps>) => {
      if (debug) console.log('movie/moviesReceived: ', action);
      var addObj = action.payload.movies;
      if (action.payload.type === 'nowPlaying') {
        state.nowPlayingMovies = addObj;
      } else if (action.payload.type === 'popular') {
        state.popularMovies = addObj;
      } else if (action.payload.type === 'topRated') {
        state.topRatedMovies = addObj;
      } else if (action.payload.type === 'upcoming') {
        state.upcomingMovies = addObj;
      }
      state.loading = false;
    },
    movieUpdated: (state, action: PayloadAction<IMovies>) => {
      if (debug) console.log('movy/movyUpdated: ', action.payload);
      var id = action.payload.id;
      state.nowPlayingMovies[id - 1] = action.payload;
      state.loading = false;
    },
    movieErrorUpdated: (state, action: PayloadAction<IMovies>) => {
      if (debug) console.log('movy/movyErrorUpdated: ', action.payload);
      var id = action.payload.id;
      state.nowPlayingMovies[id - 1] = action.payload;
      state.loading = false;
    },
    movieCreated: (state, action: PayloadAction<IMovies>) => {
      if (debug) console.log('movie/movieCreated: ', action.payload);
      let addObj = action.payload;
      let lastObj = state.nowPlayingMovies[state.nowPlayingMovies.length - 1];
      addObj = { ...addObj, id: lastObj.id + 1 };
      let compArr = [...state.nowPlayingMovies, addObj];
      state.nowPlayingMovies = compArr;

      state.loading = false;
    },
    movieDeleted: (state, action: PayloadAction<IMovies[]>) => {
      if (debug) console.log('movie/movieDeleted: ', action.payload);
      //const compArr = state.companies.filter((item) => item.id !== action.payload.id);
      //state.companies = compArr;
    },

    // onError
    moviesRequestFailed: (state) => {
      state.loading = false;
    },
    movieUpdateFailed: (state) => {
      state.loading = false;
    },
    movieCreateFailed: (state) => {
      state.loading = false;
    },
    movieDeleteFailed: (state) => {
      state.loading = false;
    },
  },
});

// export reducer
export default slice.reducer;

// export actions
export const {
  moviesReceived,
  movieUpdated,
  movieErrorUpdated,
  movieCreated,
  movieDeleted,
  moviesRequested,
  movieUpdateStart,
  movieCreateStart,
  movieDeleteStart,
  moviesRequestFailed,
  movieUpdateFailed,
  movieCreateFailed,
  movieDeleteFailed,
} = slice.actions;

// export action creators
