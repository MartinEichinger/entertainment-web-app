import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { IMovies } from '../../store/api';
import styled from '@emotion/styled';
import MovieCard from '../MovieCard/MovieCard';
import 'simplebar-react/dist/simplebar.min.css';
import FormSearchBar from '../FormSearchBar/FormSearchBar';
import { FixedSizeGrid as Grid } from 'react-window';
import { CSSProperties } from 'react';
import * as React from 'react';
import useMeasure from './useMeasure';

interface HomeProps {
  color: any;
}

const Home: React.FC<HomeProps> = ({ color }) => {
  const debug = false;
  let moviesNowPlay: IMovies[] = useAppSelector((state) => state.movies.nowPlayingMovies);
  let moviesPop: IMovies[] = useAppSelector((state) => state.movies.popularMovies);
  let moviesTop: IMovies[] = useAppSelector((state) => state.movies.topRatedMovies);
  let moviesUp: IMovies[] = useAppSelector((state) => state.movies.upcomingMovies);
  let loadStatusNowPlay: boolean = useAppSelector((state) => state.movies.loadingNowPlaying);
  let loadStatusPop: boolean = useAppSelector((state) => state.movies.loadingPopular);
  let loadStatusTop: boolean = useAppSelector((state) => state.movies.loadingTopRated);
  let loadStatusUp: boolean = useAppSelector((state) => state.movies.loadingUpcoming);
  let moviesNowPlayFiltered: IMovies[] | any;
  let moviesPopFiltered: IMovies[] | any;
  let moviesTopFiltered: IMovies[] | any;
  let moviesUpFiltered: IMovies[] | any;

  // internal states
  const [val, setVal] = useState('');
  let ref = React.useRef<HTMLDivElement>(null);
  const [RefUsed, setRefUsed] = React.useState(ref);
  const bounds = useMeasure(RefUsed);

  const colorSB = { ...color, border: 'rgba(16, 20, 30, 1)', borderActive: 'rgba(90, 105, 143, 1)' };

  if (val === '') {
    moviesNowPlayFiltered = moviesNowPlay;
    moviesPopFiltered = moviesPop;
    moviesTopFiltered = moviesTop;
    moviesUpFiltered = moviesUp;
  } else {
    moviesNowPlayFiltered = moviesNowPlay.filter(
      (item) => item.title.toLowerCase().search(val.toLowerCase()) > -1
    );
    moviesPopFiltered = moviesPop.filter(
      (item) => item.title.toLowerCase().search(val.toLowerCase()) > -1
    );
    moviesTopFiltered = moviesTop.filter(
      (item) => item.title.toLowerCase().search(val.toLowerCase()) > -1
    );
    moviesUpFiltered = moviesUp.filter(
      (item) => item.title.toLowerCase().search(val.toLowerCase()) > -1
    );
  }

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
    data: IMovies[];
  }) => {
    //if (debug) console.log('Home/Cell: ', columnIndex, rowIndex, style, data);
    if (debug)
      console.log('Home/Cell/ printLen vs availLen: ', rowIndex * colResp + columnIndex, data.length);
    let idx = rowIndex * colResp + columnIndex;
    let item = data[idx];
    let img =
      item?.thumbnail.regular.large.search('w500null') > -1
        ? '/no-image-available.jpg'
        : item?.thumbnail.regular.large;
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

  if (debug)
    console.log(
      'Home/render NowPlaying: ',
      moviesNowPlayFiltered,
      loadStatusNowPlay,
      colResp,
      bounds?.width
    );
  if (debug)
    console.log('Home/render Popular: ', moviesPopFiltered, loadStatusPop, colResp, bounds?.width);
  if (debug)
    console.log(
      'Home/render TopRated: ',
      moviesTopFiltered,
      loadStatusTop,
      colResp,
      moviesTopFiltered.length > colResp ? moviesTopFiltered.length / colResp : 1
    );
  if (debug)
    console.log('Home/render Upcoming: ', moviesUpFiltered, loadStatusUp, colResp, bounds?.width);

  return (
    <HomeBody color={color}>
      <SearchBarHM
        color={colorSB}
        value={val}
        setValue={setVal}
        placeholder="Search for movies or TV series"
      />
      <h1 className="d-flex flex-row align-items-center">
        Popular<span className="badge badge-light">{moviesPopFiltered.length}</span>
      </h1>
      {loadStatusPop === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <HorizScrollSec className="d-flex flex-row justify-content-between" color={color}>
        <Grid
          className="GridHoriz custom-scroll-vert"
          columnCount={moviesPopFiltered.length}
          columnWidth={480}
          height={260}
          rowCount={1}
          rowHeight={330}
          width={bounds?.width}
          itemData={moviesPopFiltered}
        >
          {Cell}
        </Grid>
      </HorizScrollSec>

      <h1 className="h1_wo_margin d-flex flex-row align-items-center">
        TopRated<span className="badge badge-light">{moviesTopFiltered.length}</span>
      </h1>
      {loadStatusTop === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <div ref={ref}>
        <Recommended color={color}>
          <Grid
            className="Grid custom-scroll-horiz"
            columnCount={moviesTopFiltered.length >= colResp ? colResp : moviesTopFiltered.length}
            columnWidth={(bounds?.width - 18) / colResp}
            height={520}
            rowCount={
              moviesTopFiltered.length > colResp ? Math.ceil(moviesTopFiltered.length / colResp) : 1
            }
            rowHeight={250}
            width={bounds?.width}
            itemData={moviesTopFiltered}
          >
            {Cell}
          </Grid>
        </Recommended>
      </div>

      <h1 className="h1_wo_margin d-flex flex-row align-items-center">
        Now Playing<span className="badge badge-light">{moviesNowPlayFiltered.length}</span>
      </h1>
      {loadStatusNowPlay === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <Recommended color={color}>
        <Grid
          className="Grid custom-scroll-horiz"
          columnCount={moviesNowPlayFiltered.length >= colResp ? colResp : moviesNowPlayFiltered.length}
          columnWidth={(bounds?.width - 18) / colResp}
          height={520}
          rowCount={moviesNowPlayFiltered.length > 4 ? moviesNowPlayFiltered.length / colResp : 1}
          rowHeight={250}
          width={bounds?.width}
          itemData={moviesNowPlayFiltered}
        >
          {Cell}
        </Grid>
      </Recommended>

      <h1 className="h1_wo_margin d-flex flex-row align-items-center">
        Upcoming<span className="badge badge-light">{moviesUpFiltered.length}</span>
      </h1>
      {loadStatusUp === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <Recommended className="" color={color}>
        <Grid
          className="Grid custom-scroll-horiz"
          columnCount={moviesUpFiltered.length >= colResp ? colResp : moviesUpFiltered.length}
          columnWidth={(bounds?.width - 18) / colResp}
          height={520}
          rowCount={moviesUpFiltered.length > 4 ? moviesUpFiltered.length / colResp : 1}
          rowHeight={250}
          width={bounds?.width}
          itemData={moviesUpFiltered}
        >
          {Cell}
        </Grid>
      </Recommended>
    </HomeBody>
  );
};

export default Home;

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

const HomeBody = styled.div<cssProps>`
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 0px;
  }

  h1 {
    margin-top: 25px;
    margin-bottom: 25px;

    @media (max-width: 991px) {
      margin: 25px 25px 25px 0px;
    }

    @media (max-width: 575px) {
      margin: 16px 16px 16px 0px;
    }

    &.h1_wo_margin {
      margin: 15px 0px;
      padding: 10px 10px;
      border-radius: 10px;
      background-color: ${({ color }) => color.greyishBlue};

      .badge {
        background-color: ${({ color }) => color.lightBlack};
      }
    }

    .badge {
      margin-left: 15px;
      font-size: 12px;
      background-color: ${({ color }) => color.greyishBlue};
    }
  }
`;

const HorizScrollSec = styled.div`
  margin-bottom: 25px;

  .GridHoriz {
    overflow-y: hidden !important;
  }

  .movie-card-body {
    margin-bottom: 4px;
    margin-right: 40px;
    min-width: 470px;

    .thumb {
      max-width: 470px;
      min-width: 400px;
      height: 230px;

      img {
        max-width: 470px;
        min-width: 400px;
        height: 230px; //174
      }
    }

    .descr {
      top: -85px;
      padding-left: 24px;
      padding-top: 25px;
      padding-bottom: 6px;
      //background-color: rgba(0, 0, 0, 0.5);
      background-image: linear-gradient(rgba(16, 20, 30, 0.1), rgba(6, 10, 20, 1));
      border-radius: 0px 0px 8px 8px;

      .props {
        position: relative;
      }

      h4 {
        position: relative;
      }
    }
  }
`;

const Recommended = styled.div`
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

const MovieCardR = styled(MovieCard)`
  margin-right: 4px;
  margin-bottom: 32px;
`;

/* const SimpleBarHMH = styled(SimpleBar)`
  max-width: 1240px;
  width: calc(100vw - 200px);
  .simplebar-track {
    bottom: 300px;
    right: 0px;
  }

  .simplebar-scrollbar.simplebar-visible:before {
    border: 1px solid white;
  }
`;

const SimpleBarHM = styled(SimpleBar)`
  height: 520px; //calc(100vh - 590px);
  .simplebar-track {
    right: 5px;
  }

  .simplebar-scrollbar.simplebar-visible:before {
    border: 1px solid white;
  }
`; */
