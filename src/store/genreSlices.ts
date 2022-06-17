import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getData } from './api';
import { AppThunk } from './store';

const debug = true;
const baseURL = process.env.REACT_APP_TMDB_BASIC_PATH;
const apiKey = 'api_key=' + process.env.REACT_APP_TMDB_API_KEY;
const imgURL = process.env.REACT_APP_TMDB_IMG_PATH;

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenres {
  genres: IGenre[];
}

interface IGenreState {
  loadingGenre: boolean;
  genresMovies: any[] | IGenre[];
  genresTV: any[] | IGenre[];
}

export type TObjectKeyGenre = keyof typeof initialState;

interface payloadProps {
  genres: any[] | IGenre[];
  type: string;
}

interface payloadBeginProps {
  type: string;
}

// initial state
const initialState: IGenreState = {
  loadingGenre: false,
  genresMovies: [],
  genresTV: [],
};

// create slice
export const slice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    // onStart
    genresRequested: (state) => {
      state.loadingGenre = true;
    },

    // onSuccess
    genresReceived: (state, action: PayloadAction<payloadProps>) => {
      if (debug) console.log('genre/genresReceived: ', action);
      var addObj = action.payload.genres;

      if (action.payload.type === 'genre/movie') {
        state.genresMovies = addObj;
        state.loadingGenre = false;
      } else if (action.payload.type === 'genre/tv') {
        state.genresTV = addObj;
        state.loadingGenre = false;
      }
    },

    // onError
    genressRequestFailed: (state) => {
      state.loadingGenre = false;
    },
  },
});

// export reducer
export default slice.reducer;

// export actions
export const { genresRequested, genresReceived, genressRequestFailed } = slice.actions;

// export action creators

export const getTMDBGenres = (): AppThunk => async (dispatch) => {
  // Dispatch Request
  dispatch(genresRequested());
  let formData = [
    {
      method: 'get',
      url: 'genre/movie',
      cat: 'list',
      list: 'genresMovies',
    },
    {
      method: 'get',
      url: 'genre/tv',
      cat: 'list',
      list: 'genresTV',
    },
  ];

  formData.map(async (set) => {
    let searchUrl = baseURL + set.url + '/' + set.cat + '?' + apiKey;

    let res = await getData(searchUrl, set.method);
    let genreList = [...res.genres, { id: 0, name: 'All' }];
    if (debug) console.log('genreSlices/res: ', genreList);

    // Dispatch prepared IMovies[]
    set.list === 'genresMovies'
      ? dispatch(genresReceived({ genres: genreList, type: set.url }))
      : dispatch(genresReceived({ genres: genreList, type: set.url }));
  });
};
