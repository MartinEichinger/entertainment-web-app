import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { IMovies } from '../../store/api';
import styled from '@emotion/styled';
import MovieCard from '../MovieCard/MovieCard';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import FormSearchBar from '../FormSearchBar/FormSearchBar';

interface HomeProps {
  color: any;
}

const Home: React.FC<HomeProps> = ({ color }) => {
  const debug = true;
  let moviesNowPlay: IMovies[] = useAppSelector((state) => state.movies.nowPlayingMovies);
  let moviesPop: IMovies[] = useAppSelector((state) => state.movies.popularMovies);
  let moviesTop: IMovies[] = useAppSelector((state) => state.movies.topRatedMovies);
  let moviesUp: IMovies[] = useAppSelector((state) => state.movies.upcomingMovies);
  let loadStatus: boolean = useAppSelector((state) => state.movies.loading);
  let moviesNowPlayFiltered: IMovies[] | any;
  let moviesPopFiltered: IMovies[] | any;
  let moviesTopFiltered: IMovies[] | any;
  let moviesUpFiltered: IMovies[] | any;

  // internal states
  const [val, setVal] = useState('');

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

  if (debug)
    console.log(
      'Home/render: ',
      moviesNowPlayFiltered,
      moviesPopFiltered,
      moviesTopFiltered,
      moviesUpFiltered,
      loadStatus
    );

  return (
    <HomeBody color={color}>
      <SearchBarHM
        color={colorSB}
        value={val}
        setValue={setVal}
        placeholder="Search for movies or TV series"
      />
      <h1>Popular</h1>
      <SimpleBarHMH forceVisible="x" autoHide={false}>
        <Trending className="d-flex flex-row justify-content-between" color={color}>
          {moviesPopFiltered.length > 0 ? (
            (moviesPopFiltered as IMovies[])?.map((item, i) => {
              let img: string = '';
              if (item.isTrending) img = item.thumbnail.trending.large;
              if (item.isTrending) return <MovieCardT img={img} color={color} data={item} key={i} />;
              return null;
            })
          ) : (
            <p>No entry found - {loadStatus}</p>
          )}
        </Trending>
      </SimpleBarHMH>
      <h1 className="h1_wo_margin">TopRated</h1>
      <SimpleBarHM forceVisible="y" autoHide={false}>
        <Recommended className="" color={color}>
          {moviesTopFiltered.length > 0 ? (
            (moviesTopFiltered as IMovies[])?.map((item, i) => {
              let img = item.thumbnail.regular.large;
              return <MovieCardR img={img} color={color} data={item} key={i} />;
            })
          ) : (
            <p>No entry found</p>
          )}
        </Recommended>
      </SimpleBarHM>
      <h1 className="h1_wo_margin">Now Playing</h1>
      <SimpleBarHM forceVisible="y" autoHide={false}>
        <Recommended className="" color={color}>
          {moviesNowPlayFiltered.length > 0 ? (
            (moviesNowPlayFiltered as IMovies[])?.map((item, i) => {
              let img = item.thumbnail.regular.large;
              return <MovieCardR img={img} color={color} data={item} key={i} />;
            })
          ) : (
            <p>No entry found</p>
          )}
        </Recommended>
      </SimpleBarHM>
      <h1 className="h1_wo_margin">Upcoming</h1>
      <SimpleBarHM forceVisible="y" autoHide={false}>
        <Recommended className="" color={color}>
          {moviesUpFiltered.length > 0 ? (
            (moviesUpFiltered as IMovies[])?.map((item, i) => {
              let img = item.thumbnail.regular.large;
              return <MovieCardR img={img} color={color} data={item} key={i} />;
            })
          ) : (
            <p>No entry found</p>
          )}
        </Recommended>
      </SimpleBarHM>
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
`;

const MovieCardR = styled(MovieCard)`
  margin-right: 4px;
  margin-bottom: 32px;
`;
