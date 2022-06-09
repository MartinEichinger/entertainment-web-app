import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IMovies } from './api';

const debug = true;
//const baseURL = process.env.REACT_APP_BACKEND_PATH;
const removeURL = process.env.REACT_APP_STATIC_REMOVE;

interface movieState {
  loadingNowPlaying: boolean;
  loadingPopular: boolean;
  loadingTopRated: boolean;
  loadingUpcoming: boolean;
  nowPlayingMovies: any[] | IMovies[];
  popularMovies: any[] | IMovies[];
  topRatedMovies: any[] | IMovies[];
  upcomingMovies: any[] | IMovies[];
}

interface payloadProps {
  movies: IMovies[];
  type: string;
}

interface payloadBeginProps {
  type: string;
}

// initial state
const initialState: movieState = {
  loadingNowPlaying: false,
  loadingPopular: false,
  loadingTopRated: false,
  loadingUpcoming: false,
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
    moviesRequested: (state, action: PayloadAction<payloadBeginProps>) => {
      if (action.payload.type === 'nowPlaying') {
        state.loadingNowPlaying = true;
      } else if (action.payload.type === 'popular') {
        state.loadingPopular = true;
      } else if (action.payload.type === 'topRated') {
        state.loadingTopRated = true;
      } else if (action.payload.type === 'upcoming') {
        state.loadingUpcoming = true;
      }
    },
    movieUpdateStart: (state) => {
      state.loadingPopular = true;
    },
    movieCreateStart: (state) => {
      state.loadingPopular = true;
    },
    movieDeleteStart: (state) => {
      state.loadingPopular = true;
    },

    // onSuccess
    moviesReceived: (state, action: PayloadAction<payloadProps>) => {
      if (debug) console.log('movie/moviesReceived: ', action);
      var addObj = action.payload.movies;
      if (action.payload.type === 'nowPlaying') {
        state.nowPlayingMovies = addObj;
        state.loadingNowPlaying = false;
      } else if (action.payload.type === 'popular') {
        state.popularMovies = addObj;
        state.loadingPopular = false;
      } else if (action.payload.type === 'topRated') {
        state.topRatedMovies = addObj;
        state.loadingTopRated = false;
      } else if (action.payload.type === 'upcoming') {
        state.upcomingMovies = addObj;
        state.loadingUpcoming = false;
      }
    },
    movieUpdated: (state, action: PayloadAction<IMovies>) => {
      if (debug) console.log('movy/movyUpdated: ', action.payload);
      var id = action.payload.id;
      state.nowPlayingMovies[id - 1] = action.payload;
      state.loadingPopular = false;
    },
    movieErrorUpdated: (state, action: PayloadAction<IMovies>) => {
      if (debug) console.log('movy/movyErrorUpdated: ', action.payload);
      var id = action.payload.id;
      state.nowPlayingMovies[id - 1] = action.payload;
      state.loadingPopular = false;
    },
    movieCreated: (state, action: PayloadAction<IMovies>) => {
      if (debug) console.log('movie/movieCreated: ', action.payload);
      let addObj = action.payload;
      let lastObj = state.nowPlayingMovies[state.nowPlayingMovies.length - 1];
      addObj = { ...addObj, id: lastObj.id + 1 };
      let compArr = [...state.nowPlayingMovies, addObj];
      state.nowPlayingMovies = compArr;

      state.loadingPopular = false;
    },
    movieDeleted: (state, action: PayloadAction<IMovies[]>) => {
      if (debug) console.log('movie/movieDeleted: ', action.payload);
      //const compArr = state.companies.filter((item) => item.id !== action.payload.id);
      //state.companies = compArr;
    },

    // onError
    moviesRequestFailed: (state) => {
      state.loadingPopular = false;
    },
    movieUpdateFailed: (state) => {
      state.loadingPopular = false;
    },
    movieCreateFailed: (state) => {
      state.loadingPopular = false;
    },
    movieDeleteFailed: (state) => {
      state.loadingPopular = false;
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
// comment
