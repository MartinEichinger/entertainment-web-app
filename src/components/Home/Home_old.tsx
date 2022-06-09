import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { IMovies } from '../../store/api';
import styled from '@emotion/styled';
import MovieCard from '../MovieCard/MovieCard';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import FormSearchBar from '../FormSearchBar/FormSearchBar';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { FixedSizeGrid as Grid } from 'react-window';
import { CSSProperties } from 'react';
import * as React from 'react';
import useMeasure from './useMeasure';

interface HomeProps {
  color: any;
}

const Home: React.FC<HomeProps> = ({ color }) => {
  const debug = true;
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

  if (debug) console.log('Home/render NowPlaying: ', moviesNowPlayFiltered, loadStatusNowPlay);
  if (debug) console.log('Home/render Popular: ', moviesPopFiltered, loadStatusPop);
  if (debug) console.log('Home/render TopRated: ', moviesTopFiltered, loadStatusTop);
  if (debug) console.log('Home/render Upcoming: ', moviesUpFiltered, loadStatusUp);

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
    {
      console.log('col/row: ', columnIndex, rowIndex);
      let item = data[rowIndex * 4 + columnIndex];
      let img = item.thumbnail.regular.large;
      return (
        <div style={style}>
          <MovieCardR img={img} color={color} data={item} />;
        </div>
      );
    }
  };

  let colResp = bounds?.width > 1000 ? 4 : bounds?.width > 750 ? 3 : bounds?.width > 500 ? 2 : 1;
  return (
    <HomeBody color={color}>
      <SearchBarHM
        color={colorSB}
        value={val}
        setValue={setVal}
        placeholder="Search for movies or TV series"
      />
      <h1>Popular</h1>
      {loadStatusPop === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <LazyLoadComponent>
        <SimpleBarHMH forceVisible="x" autoHide={false}>
          <Trending className="d-flex flex-row justify-content-between" color={color}>
            {moviesPopFiltered.length > 0
              ? (moviesPopFiltered as IMovies[])?.map((item, i) => {
                  let img: string = '';
                  if (item.isTrending) img = item.thumbnail.trending.large;
                  if (item.isTrending) return <MovieCardT img={img} color={color} data={item} key={i} />;
                  return null;
                })
              : null}
          </Trending>
        </SimpleBarHMH>
      </LazyLoadComponent>

      <h1 className="h1_wo_margin">TopRated</h1>
      {loadStatusTop === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <div ref={ref}>
        <Recommended color={color}>
          <Grid
            className="Grid"
            columnCount={colResp}
            columnWidth={bounds?.width / colResp - 7}
            height={520}
            rowCount={moviesTopFiltered.length / colResp}
            rowHeight={250}
            width={bounds?.width}
            itemData={moviesTopFiltered}
          >
            {Cell}
          </Grid>
        </Recommended>
      </div>

      <h1 className="h1_wo_margin">Now Playing</h1>
      {loadStatusNowPlay === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <Recommended color={color}>
        <Grid
          className="Grid"
          columnCount={colResp}
          columnWidth={bounds?.width / colResp - 7}
          height={520}
          rowCount={moviesNowPlayFiltered.length / colResp}
          rowHeight={250}
          width={bounds?.width}
          itemData={moviesNowPlayFiltered}
        >
          {Cell}
        </Grid>
      </Recommended>

      <h1 className="h1_wo_margin">Upcoming</h1>
      {loadStatusUp === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      <Recommended className="" color={color}>
        <Grid
          className="Grid"
          columnCount={colResp}
          columnWidth={bounds?.width / colResp - 7}
          height={520}
          rowCount={moviesUpFiltered.length / colResp}
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
`;

const SimpleBarHMH = styled(SimpleBar)`
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
`;

const HomeBody = styled.div<cssProps>`
  margin-top: 32px;
  h1 {
    margin-top: 25px;
    margin-bottom: 25px;

    &.h1_wo_margin {
      margin: 15px 0px;
      padding: 10px 10px;
      border-radius: 10px;
      background-color: ${({ color }) => color.greyishBlue};
    }
  }
`;

const Trending = styled.div`
  margin-bottom: 25px;
`;

const MovieCardT = styled(MovieCard)`
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

  .props {
    position: relative;
    top: -70px;
    margin-left: 24px;
  }

  h4 {
    position: relative;
    top: -70px;
    margin-left: 24px;
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
`;

const MovieCardR = styled(MovieCard)`
  margin-right: 4px;
  margin-bottom: 32px;
`;
