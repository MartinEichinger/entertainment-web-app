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
  let movies: IMovies[] = useAppSelector((state) => state.movies.movies);
  let moviesFiltered: IMovies[] | any;

  // internal states
  const [val, setVal] = useState('');

  const colorSB = { ...color, border: 'rgba(16, 20, 30, 1)', borderActive: 'rgba(90, 105, 143, 1)' };

  if (val === '') {
    moviesFiltered = movies;
    console.log('hier');
  } else {
    moviesFiltered = movies.filter((item) => item.title.toLowerCase().search(val) > -1);
    console.log('hier2');
  }
  console.log('Home/movies: ', movies);
  console.log('Home/Filtered: ', moviesFiltered);
  console.log('Home/val: ', val);

  return (
    <HomeBody>
      <SearchBarHM
        color={colorSB}
        value={val}
        setValue={setVal}
        placeholder="Search for movies or TV series"
      />
      <h1>Trending</h1>
      <SimpleBarHMH forceVisible="x" autoHide={false}>
        <Trending className="d-flex flex-row justify-content-between" color={color}>
          {moviesFiltered.length > 0 ? (
            (moviesFiltered as IMovies[])?.map((item, i) => {
              let img: string = '';
              if (item.isTrending) img = item.thumbnail.trending.large;
              if (item.isTrending) return <MovieCardT img={img} color={color} data={item} key={i} />;
              return null;
            })
          ) : (
            <p>No entry found</p>
          )}
        </Trending>
      </SimpleBarHMH>
      <h1>Recommended for you</h1>
      <SimpleBarHM forceVisible="y" autoHide={false}>
        <Recommended className="" color={color}>
          {moviesFiltered.length > 0 ? (
            (moviesFiltered as IMovies[])?.map((item, i) => {
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
  height: calc(100vh - 590px);
  .simplebar-track {
    right: 5px;
  }

  .simplebar-scrollbar.simplebar-visible:before {
    border: 1px solid white;
  }
`;

const HomeBody = styled.div`
  margin-top: 32px;
  h1 {
    margin-top: 25px;
    margin-bottom: 25px;
  }
`;

const Trending = styled.div`
  margin-bottom: 25px;
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
`;
