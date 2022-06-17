import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { IMedias } from '../../store/mediaSlices';
import styled from '@emotion/styled';
import MovieCard from '../MovieCard/MovieCard';
import 'simplebar-react/dist/simplebar.min.css';
import FormSearchBar from '../FormSearchBar/FormSearchBar';
import { FixedSizeGrid as Grid } from 'react-window';
import { CSSProperties } from 'react';
import * as React from 'react';
import useMeasure from '../../helpers/useMeasure';
import { formDataArr, mediaState } from '../../store/mediaSlices';

interface HomeProps {
  color: any;
}

interface IDataProps {
  popularMovies: any[] | IMedias[];
  topRatedMovies: any[] | IMedias[];
  nowPlayingMovies: any[] | IMedias[];
  upcomingMovies: any[] | IMedias[];
  popularTV: any[] | IMedias[];
  topRatedTV: any[] | IMedias[];
  airingTodayTV: any[] | IMedias[];
  onTheAirTV: any[] | IMedias[];
}

const Home: React.FC<HomeProps> = ({ color }) => {
  const debug = false;

  let data: IDataProps = {
    popularMovies: useAppSelector((state) => state.medias.popularMovies),
    topRatedMovies: useAppSelector((state) => state.medias.topRatedMovies),
    nowPlayingMovies: useAppSelector((state) => state.medias.nowPlayingMovies),
    upcomingMovies: useAppSelector((state) => state.medias.upcomingMovies),
    popularTV: useAppSelector((state) => state.medias.popularTV),
    topRatedTV: useAppSelector((state) => state.medias.topRatedTV),
    airingTodayTV: useAppSelector((state) => state.medias.airingTodayTV),
    onTheAirTV: useAppSelector((state) => state.medias.onTheAirTV),
  };

  let dataFiltered: IDataProps = {
    popularMovies: [],
    topRatedMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    popularTV: [],
    topRatedTV: [],
    airingTodayTV: [],
    onTheAirTV: [],
  };

  let dataLoadStatus = {
    popularMovies: useAppSelector((state) => state.medias.loadingPopularMovies),
    topRatedMovies: useAppSelector((state) => state.medias.loadingTopRatedMovies),
    nowPlayingMovies: useAppSelector((state) => state.medias.loadingNowPlayingMovies),
    upcomingMovies: useAppSelector((state) => state.medias.loadingUpcomingMovies),
    popularTV: useAppSelector((state) => state.medias.loadingPopularTV),
    topRatedTV: useAppSelector((state) => state.medias.loadingTopRatedTV),
    airingTodayTV: useAppSelector((state) => state.medias.loadingAiringTodayTV),
    onTheAirTV: useAppSelector((state) => state.medias.loadingOnTheAirTV),
  };

  // internal states
  const [val, setVal] = useState('');
  let ref = React.useRef<HTMLDivElement>(null);
  const [RefUsed, setRefUsed] = React.useState(ref);
  const bounds = useMeasure(RefUsed);

  const colorSB = { ...color, border: 'rgba(16, 20, 30, 1)', borderActive: 'rgba(90, 105, 143, 1)' };
  type ObjectKey = keyof typeof data;

  if (val === '') {
    for (let datum in data) {
      dataFiltered[datum as ObjectKey] = data[datum as ObjectKey];
    }
  } else {
    for (let datum in data) {
      dataFiltered[datum as ObjectKey] = data[datum as ObjectKey].filter((item) => {
        //console.log(item);
        return item.title.toLowerCase().search(val.toLowerCase()) > -1;
      });
    }
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
    data: IMedias[];
  }) => {
    //if (debug) console.log('Home/Cell: ', columnIndex, rowIndex, style, data);
    if (debug)
      console.log('Home/Cell/ printLen vs availLen: ', rowIndex * colResp + columnIndex, data.length);
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

  return (
    <HomeBody color={color}>
      <SearchBarHM
        color={colorSB}
        value={val}
        setValue={setVal}
        placeholder="Search for movies or TV series"
      />
      {formDataArr.map((entry) => {
        let key = entry.actionType.split('/')[1] as ObjectKey;
        return (
          <>
            <h1 className="d-flex flex-row align-items-center" ref={ref}>
              {entry.heading}
              <span className="badge badge-light">{dataFiltered[key].length}</span>
            </h1>
            {dataLoadStatus[key] === true ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : null}
            <HorizScrollSec className="d-flex flex-row justify-content-between" color={color}>
              <Grid
                className="GridHoriz custom-scroll-vert"
                columnCount={dataFiltered[key].length}
                columnWidth={480}
                height={260}
                rowCount={1}
                rowHeight={330}
                width={bounds?.width}
                itemData={dataFiltered[key]}
              >
                {Cell}
              </Grid>
            </HorizScrollSec>
          </>
        );
      })}

      {/*
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

      */}
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
