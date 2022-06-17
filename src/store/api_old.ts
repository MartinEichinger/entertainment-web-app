import axios from 'axios';

const debug = false;
const baseURL = process.env.REACT_APP_TMDB_BASIC_PATH;
const apiKey = 'api_key=' + process.env.REACT_APP_TMDB_API_KEY;
const imgURL = process.env.REACT_APP_TMDB_IMG_PATH;

export interface IMovies {
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
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export async function getMovies(
  url: string,
  method: string,
  cat: string,
  wPage: boolean
): Promise<IMovies[]> {
  let arr: IMovies[] = [];
  const maxLen = 500;
  let len = wPage ? maxLen : 1;

  //console.log(url, cat);
  for (let i = 1; i <= len; i++) {
    let searchUrl = wPage
      ? baseURL + url + '/' + cat + '?' + apiKey + '&page=' + i.toString()
      : baseURL + url + '/' + cat + '?' + apiKey;

    const response = axios.request({
      method: method,
      url: searchUrl,
    });

    let res = (await response).data;
    if (res.total_pages < maxLen) len = res.total_pages;

    if (debug) console.log('api/res: ', res, len);

    let arrTemp: IMovies[] = res.results.map((item: any) => {
      //if (debug) console.log('api-detail: ', item);
      return {
        id: item.id,
        title: item.title,
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
        year: item.release_date?.slice(0, 4),
        category: 'Movie',
        rating: item.vote_average,
        isBookmarked: false,
        isTrending:
          item.popularity > 600 &&
          (item.release_date?.slice(0, 4) === '2021' || item.release_date?.slice(0, 4) === '2022'),
      };
    });
    arr = arr.concat(res);
  }
  //if (debug) console.log('api: ', arr);
  return arr;
}

// READ

export async function getNowPlayingMovies(): Promise<IMovies[]> {
  if (debug) console.log('movieSlice/getNowPlayingMovies');

  let url = 'movie';
  let cat = 'now_playing';
  let wPage = true;
  let method = 'get';
  //let movies: Movies[] = [];

  const movies = await getMovies(url, method, cat, wPage);
  return movies;
}

export async function getPopularMovies(): Promise<IMovies[]> {
  if (debug) console.log('movieSlice/getPopularMovies');

  let url = 'movie';
  let cat = 'popular';
  let wPage = true;
  let method = 'get';
  //let movies: Movies[] = [];

  const movies = await getMovies(url, method, cat, wPage);
  return movies;
}

export async function getTopRatedMovies(): Promise<IMovies[]> {
  if (debug) console.log('movieSlice/getTopRatedMovies');

  let url = 'movie';
  let cat = 'top_rated';
  let wPage = true;
  let method = 'get';

  const movies = await getMovies(url, method, cat, wPage);
  return movies;
}

export async function getUpcomingMovies(): Promise<IMovies[]> {
  if (debug) console.log('movieSlice/getUpcomingMovies');

  let url = 'movie';
  let cat = 'upcoming';
  let wPage = true;
  let method = 'get';

  const movies = await getMovies(url, method, cat, wPage);
  return movies;
}
