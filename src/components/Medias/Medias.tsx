import { CSSProperties } from 'react';
import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { IGenre } from '../../store/genreSlices';
import { getMediaList } from '../../store/mediaSlices';
import { FixedSizeGrid as Grid } from 'react-window';
import useMeasure from '../../helpers/useMeasure';
import { IMedias } from '../../store/mediaSlices';
import MovieCard from '../MovieCard/MovieCard';
import type { TObjectKeyGenre } from '../../store/genreSlices';
import FormSearchBar from '../FormSearchBar/FormSearchBar';

interface IMediaProps {
  mediaType: string; // 'movie', 'tv'
  color: any;
}

const Medias: React.FC<IMediaProps> = ({ mediaType, color }) => {
  const debug = 0;
  const dispatch = useAppDispatch();

  let ref = React.useRef<HTMLDivElement>(null);
  const [RefUsed] = React.useState(ref); // setRefUsed
  const [selectedGenre, setSelectedGenre] = React.useState(0);
  const bounds = useMeasure(RefUsed);
  const [val, setVal] = useState('');

  const colorSB = { ...color, border: 'rgba(16, 20, 30, 1)', borderActive: 'rgba(90, 105, 143, 1)' };

  let catI: TObjectKeyGenre;
  if (mediaType === 'movie') {
    catI = 'genresMovies';
  } else if (mediaType === 'tv') {
    catI = 'genresTV';
  }

  let mediaGenres: IGenre[] = useAppSelector((state) => state.genres[catI]) as IGenre[];

  let tv: IMedias[] = useAppSelector((state) => state.medias['allFilteredTV']) as IMedias[];
  let movies: IMedias[] = useAppSelector((state) => state.medias['allFilteredMovies']) as IMedias[];
  let media: IMedias[] = [];
  let mediaFiltered: IMedias[] = [];
  let bookmarkedMedia = useAppSelector((state) => state.medias.allBookmarkedMedia);

  if (mediaType === 'movie') {
    media = movies;
  } else if (mediaType === 'tv') {
    media = tv;
  } else if (mediaType === 'bookmark') {
    let p1 = movies.filter((item) => {
      return bookmarkedMedia.includes(item.id);
    });
    let p2 = tv.filter((item) => {
      return bookmarkedMedia.includes(item.id);
    });
    media = p1.concat(p2);
  }

  if (val === '') {
    mediaFiltered = media;
  } else {
    mediaFiltered = media.filter((item) => {
      return item.title.toLowerCase().search(val.toLowerCase()) > -1;
    });
  }

  if (debug > 0) console.log('Movies/mediaGenres: ', mediaGenres);
  if (debug > 0) console.log('Movies/movies: ', media);

  let colResp = bounds?.width > 1000 ? 4 : bounds?.width > 750 ? 3 : bounds?.width > 500 ? 2 : 1;

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
    data: IMedias[];
  }) => {
    if (debug > 1) console.log('Medias/Cell: ', columnIndex, rowIndex, style, data);
    //if (debug)
    //  console.log('Home/Cell/ printLen vs availLen: ', rowIndex * colResp + columnIndex, data.length);
    let idx = rowIndex * colResp + columnIndex;
    let item = data[idx];
    let img =
      item?.thumbnail?.regular.large.search('w500null') > -1
        ? '/no-image-available.jpg'
        : item?.thumbnail?.regular.large;
    return (
      <>
        {idx < data.length && (
          <div style={style}>
            <MovieCardR img={img} color={color} data={item} />
          </div>
        )}
      </>
    );
  };

  const selectByGenre = (genreId: number) => {
    if (debug > 1) console.log('Medias/selectByGenre', genreId);
    setSelectedGenre(genreId);
    dispatch(getMediaList(genreId, mediaType));
  };

  return (
    <MovieBody color={color}>
      {mediaType !== 'bookmark' && (
        <SearchBarHM
          color={colorSB}
          value={val}
          setValue={setVal}
          placeholder={mediaType === 'movie' ? 'Search for movies' : 'Search for TV series'}
        />
      )}

      <h1 className="d-flex flex-row align-items-center">
        {mediaType === 'movie' ? 'Movies' : mediaType === 'tv' ? 'TV' : 'Bookmarked Media'}
        <span className="badge badge-light">{mediaFiltered.length}</span>
      </h1>
      <div className="genre-scroll d-flex flex-row flex-wrap mb-3 mt-3 custom-scroll-horiz">
        {mediaType !== 'bookmark' &&
          mediaGenres?.map((genre, i) => {
            return (
              <GenreCard
                className={genre.id === selectedGenre ? 'active' : ''}
                color={color}
                onClick={() => selectByGenre(genre.id)}
              >
                {genre.name}
              </GenreCard>
            );
          })}
      </div>
      <div ref={ref}>
        <VertScrollSec color={color}>
          <Grid
            className="Grid custom-scroll-horiz"
            columnCount={mediaFiltered.length >= colResp ? colResp : mediaFiltered.length}
            columnWidth={(bounds?.width - 18) / colResp}
            height={1020}
            rowCount={mediaFiltered.length > colResp ? Math.ceil(mediaFiltered.length / colResp) : 1}
            rowHeight={250}
            width={bounds?.width}
            itemData={mediaFiltered}
          >
            {Cell}
          </Grid>
        </VertScrollSec>
      </div>
    </MovieBody>
  );
};

export default Medias;

type cssProps = {
  color: any;
};

const SearchBarHM = styled(FormSearchBar)`
  max-width: 1184px;
  width: calc(100vw - 256px);

  @media (max-width: 991px) {
    width: calc(100vw - 57px);
  }

  @media (max-width: 575px) {
    width: calc(100vw - 57px);
  }
`;

const MovieBody = styled.div<cssProps>`
  margin-top: 32px;

  h1 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .genre-scroll {
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 3px;
    }

    @media (max-width: 1024px) {
      flex-wrap: nowrap !important;
    }
  }

  .badge {
    margin-left: 15px;
    font-size: 12px;
    background-color: ${({ color }) => color.greyishBlue};
  }
`;

const MovieCardR = styled(MovieCard)`
  margin-right: 4px;
  margin-bottom: 32px;
`;

const GenreCard = styled.div<cssProps>`
  width: 120px;
  text-align: center;
  background-color: ${({ color }) => color.greyishBlue};
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
  flex-shrink: 0;

  &.active {
    background-color: ${({ color }) => color.white};
  }
`;

const VertScrollSec = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0px 20px;

  .Grid {
    //background-color: beige;

    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: between;
      //margin-right: 5px;

      div {
        margin-right: 20px;
      }
    }
  }

  .GridHoriz {
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: between;
      //margin-right: 5px;

      div {
        margin-right: 20px;
      }
    }
  }
`;
