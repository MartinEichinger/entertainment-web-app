import axios from 'axios';
import type { IGenres } from './genreSlices';

const debug = false;
const baseURL = process.env.REACT_APP_TMDB_BASIC_PATH;
const apiKey = 'api_key=' + process.env.REACT_APP_TMDB_API_KEY;
const imgURL = process.env.REACT_APP_TMDB_IMG_PATH;

export interface IMovResults {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}

export async function getData(url: string, method: string): Promise<IMovResults & IGenres> {
  const response = axios.request({
    method: method,
    url: url,
  });

  let res = (await response).data;

  if (debug) console.log('api: ', res);
  return res;
}
