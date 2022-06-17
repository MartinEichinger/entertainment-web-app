import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IMovResults } from './api';
import { getData } from './api';
import { AppThunk } from './store';
import capitalize from '../helpers/capitalize';

const debug = true;
const baseURL = process.env.REACT_APP_TMDB_BASIC_PATH;
const apiKey = 'api_key=' + process.env.REACT_APP_TMDB_API_KEY;
const imgURL = process.env.REACT_APP_TMDB_IMG_PATH;

const requestTypes = [
  'movie/popularMovies',
  'movie/topRatedMovies',
  'movie/nowPlayingMovies',
  'movie/upcomingMovies',
  'movie/allFilteredMovies',
  'tv/popularTV',
  'tv/topRatedTV',
  'tv/airingTodayTV',
  'tv/onTheAirTV',
  'tv/allFilteredTV',
];

interface IFormData {
  message: string;
  actionType: string;
  url: string;
  cat: string;
  wPage: boolean;
  method: string;
}

export const formDataArr = [
  {
    heading: 'Popular Movies',
    message: 'mediaSlice/getPopularMovies',
    actionType: 'movie/popularMovies',
    url: 'movie',
    cat: 'popular',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'Top Rated Movies',
    message: 'mediaSlice/getTopRatedMovies',
    actionType: 'movie/topRatedMovies',
    url: 'movie',
    cat: 'top_rated',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'Now Playing Movies',
    message: 'mediaSlice/getNowPlayingMovies',
    actionType: 'movie/nowPlayingMovies',
    url: 'movie',
    cat: 'now_playing',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'Upcoming Movies',
    message: 'mediaSlice/getUpcomingMovies',
    actionType: 'movie/upcomingMovies',
    url: 'movie',
    cat: 'upcoming',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'Popular TV Series',
    message: 'mediaSlice/getPopularTV',
    actionType: 'tv/popularTV',
    url: 'tv',
    cat: 'popular',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'Top Rated TV Series',
    message: 'mediaSlice/getTopRatedTV',
    actionType: 'tv/topRatedTV',
    url: 'tv',
    cat: 'top_rated',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'Airing Today TV Series',
    message: 'mediaSlice/getAiringTodayTV',
    actionType: 'tv/airingTodayTV',
    url: 'tv',
    cat: 'airing_today',
    wPage: true,
    method: 'get',
  },
  {
    heading: 'On The Air TV Series',
    message: 'mediaSlice/getOnTheAirTV',
    actionType: 'tv/onTheAirTV',
    url: 'tv',
    cat: 'on_the_air',
    wPage: true,
    method: 'get',
  },
];

export interface mediaState {
  loadingPopularMovies: boolean;
  loadingTopRatedMovies: boolean;
  loadingNowPlayingMovies: boolean;
  loadingUpcomingMovies: boolean;
  loadingAllFilteredMovies: boolean;
  popularMovies: any[] | IMedias[];
  topRatedMovies: any[] | IMedias[];
  nowPlayingMovies: any[] | IMedias[];
  upcomingMovies: any[] | IMedias[];
  allFilteredMovies: any[] | IMedias[];
  loadingPopularTV: boolean;
  loadingTopRatedTV: boolean;
  loadingAiringTodayTV: boolean;
  loadingOnTheAirTV: boolean;
  loadingAllFilteredTV: boolean;
  popularTV: any[] | IMedias[];
  topRatedTV: any[] | IMedias[];
  airingTodayTV: any[] | IMedias[];
  onTheAirTV: any[] | IMedias[];
  allFilteredTV: any[] | IMedias[];
}

export interface IMedias {
  id: number;
  title: string;
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  genre_ids: number[];
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

interface payloadProps {
  medias: IMedias[];
  type: string;
}

interface payloadBeginProps {
  type: string;
}

// initial state
const initialState: mediaState = {
  loadingPopularMovies: false,
  loadingTopRatedMovies: false,
  loadingNowPlayingMovies: false,
  loadingUpcomingMovies: false,
  loadingAllFilteredMovies: false,
  popularMovies: [],
  topRatedMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  allFilteredMovies: [],
  loadingPopularTV: false,
  loadingTopRatedTV: false,
  loadingAiringTodayTV: false,
  loadingOnTheAirTV: false,
  loadingAllFilteredTV: false,
  popularTV: [],
  topRatedTV: [],
  airingTodayTV: [],
  onTheAirTV: [],
  allFilteredTV: [],
};

export type TObjectKeyMedia = keyof typeof initialState;

// create slice
export const slice = createSlice({
  name: 'medias',
  initialState,
  reducers: {
    // onStart
    mediasRequested: (state, action: PayloadAction<payloadBeginProps>) => {
      if (debug) console.log('mediasRequested/Payload: ', action.payload);
      if (requestTypes.includes(action.payload.type)) {
        let entry = ('loading' + capitalize(action.payload.type.split('/')[1])) as TObjectKeyMedia;
        (state[entry] as boolean) = true;
      }
    },

    // onSuccess
    mediasReceived: (state, action: PayloadAction<payloadProps>) => {
      if (debug) console.log('media/mediaReceived: ', action, requestTypes, action.payload.type);
      var addObj = action.payload.medias;

      if (requestTypes.includes(action.payload.type)) {
        let entry = action.payload.type.split('/')[1] as TObjectKeyMedia;
        if (debug) console.log('media/mediaReceivedInner: ', entry);
        (state[entry] as any[] | IMedias[]) = addObj;
      }
    },
    /*     movieErrorUpdated: (state, action: PayloadAction<IMedias>) => {
      if (debug) console.log('movy/movyErrorUpdated: ', action.payload);
      var id = action.payload.id;
      state.nowPlayingMovies[id - 1] = action.payload;
      state.loadingPopular = false;
    }, */

    // onError
    mediasRequestFailed: (state) => {
      state.loadingPopularTV = false;
    },
  },
});

// export reducer
export default slice.reducer;

// export actions
export const { mediasReceived, mediasRequested, mediasRequestFailed } = slice.actions;

// export action creators
export const getTMDBMedias = (): AppThunk => async (dispatch) => {
  formDataArr.map((formData) => {
    if (debug) console.log('getTMDBMedias: ', formData.message);
    dispatch(getTMDBMedia(formData));
  });
};

export const getTMDBMedia =
  (formData: IFormData): AppThunk =>
  async (dispatch) => {
    // Dispatch Request
    dispatch(mediasRequested({ type: formData.cat }));

    // Iterate about all movie pages
    const maxLen = 500;
    let len = formData.wPage ? maxLen : 1;
    let mov: IMedias[] = [];
    let movies: IMedias[] = [];

    for (let i = 1; i <= len; i++) {
      let searchUrl =
        baseURL + formData.url + '/' + formData.cat + '?' + apiKey + '&page=' + i.toString();

      let res = await getData(searchUrl, formData.method);
      if (res.total_pages < maxLen) len = res.total_pages;

      //console.log(res);
      mov = res.results.map((item: any) => {
        let relYear = item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4);
        let name = item.title || item.name;
        return {
          id: item.id,
          title: name,
          thumbnail: {
            trending: {
              small: imgURL + item.backdrop_path,
              large: imgURL + item.backdrop_path,
            },
            regular: {
              small: imgURL + item.backdrop_path,
              medium: imgURL + item.backdrop_path,
              large: imgURL + item.backdrop_path,
            },
          },
          year: relYear,
          category: formData.url,
          genre_ids: item.genre_ids,
          rating: item.vote_average,
          isBookmarked: false,
          isTrending: item.popularity > 600 && (relYear === '2021' || relYear === '2022'),
        } as IMedias;
      });

      movies.push(...mov);
    }
    // Dispatch prepared IMovies[]
    if (debug) console.log('media/mediaInputReceived: ', movies, formData.actionType);
    dispatch(mediasReceived({ medias: movies, type: formData.actionType }));
    formData.actionType.split('/')[0] === 'movie'
      ? dispatch(getMediaList(0, 'movie'))
      : dispatch(getMediaList(0, 'tv'));
  };

export const getMediaList =
  (genreId?: number, mediaType?: string): AppThunk =>
  async (dispatch, getState) => {
    let state = getState();
    //console.log('getMediaList', state);
    let medias = [] as IMedias[];
    let uniqMedias = [];
    let uniqIDs: any[] = [];

    formDataArr.map((set) => {
      let cat = set.actionType.split('/')[1] as TObjectKeyMedia;
      let datas = state.medias[cat] as IMedias[];
      console.log('getMediaList/datas', datas, set.url, mediaType);
      if (set.url === mediaType) {
        medias.push(...datas);
      }
    });
    //console.log('getMediaList', medias, genreId);

    //movies.sort((a, b) => a.id - b.id);
    console.log('getMediaList/medias', medias);

    uniqMedias = medias.filter((el) => {
      const isDuplicate = uniqIDs.includes(el.id);
      let isFilter = true;
      if (genreId) isFilter = el.genre_ids.includes(genreId);
      if (!isDuplicate && isFilter) {
        uniqIDs.push(el.id);
        return true;
      }
      return false;
    });
    console.log('getMediaList', uniqMedias, mediaType);

    // Dispatch prepared IMovies[]
    mediaType === 'movie'
      ? dispatch(mediasReceived({ medias: uniqMedias, type: 'movie/allFilteredMovies' }))
      : dispatch(mediasReceived({ medias: uniqMedias, type: 'tv/allFilteredTV' }));
  };
