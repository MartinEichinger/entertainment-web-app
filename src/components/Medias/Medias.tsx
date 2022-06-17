import { CSSProperties } from 'react';
import * as React from 'react';
import styled from '@emotion/styled';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { IGenre } from '../../store/genreSlices';
import { getMediaList } from '../../store/mediaSlices';
import { FixedSizeGrid as Grid } from 'react-window';
import useMeasure from '../../helpers/useMeasure';
import { IMedias } from '../../store/mediaSlices';
import MovieCard from '../MovieCard/MovieCard';
import type { TObjectKeyGenre } from '../../store/genreSlices';
import type { TObjectKeyMedia } from '../../store/mediaSlices';

interface IMediaProps {
  mediaType: string; // 'movie', 'tv'
  color: any;
}

const Medias: React.FC<IMediaProps> = ({ mediaType, color }) => {
  const debug = true;
  const dispatch = useAppDispatch();

  let ref = React.useRef<HTMLDivElement>(null);
  const [RefUsed, setRefUsed] = React.useState(ref);
  const [selectedGenre, setSelectedGenre] = React.useState(0);
  const bounds = useMeasure(RefUsed);

  let catI = (mediaType === 'movie' ? 'genresMovies' : 'genresTV') as TObjectKeyGenre;
  let mediaGenres: IGenre[] = useAppSelector((state) => state.genres[catI]) as IGenre[];

  let catII = (mediaType === 'movie' ? 'allFilteredMovies' : 'allFilteredTV') as TObjectKeyMedia;
  let movies: IMedias[] = useAppSelector((state) => state.medias[catII]) as IMedias[];

  if (debug) console.log('Movies/mediaGenres: ', mediaGenres, catII);
  if (debug) console.log('Movies/movies: ', movies);

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
    //if (debug) console.log('Home/Cell: ', columnIndex, rowIndex, style, data);
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
    if (debug) console.log('Movies/selectByGenre', genreId);
    setSelectedGenre(genreId);
    dispatch(getMediaList(genreId, mediaType));
  };

  return (
    <MovieBody color={color}>
      <h1 className="d-flex flex-row align-items-center">
        {mediaType === 'movie' ? 'Movies' : 'TV'}
        <span className="badge badge-light">{movies.length}</span>
      </h1>
      <div className="d-flex flex-row flex-wrap mb-3 mt-3">
        {mediaGenres.map((genre, i) => {
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
            columnCount={movies.length >= colResp ? colResp : movies.length}
            columnWidth={(bounds?.width - 18) / colResp}
            height={1020}
            rowCount={movies.length > colResp ? Math.ceil(movies.length / colResp) : 1}
            rowHeight={250}
            width={bounds?.width}
            itemData={movies}
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

const MovieBody = styled.div<cssProps>`
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
