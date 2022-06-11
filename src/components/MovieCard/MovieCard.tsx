import styled from '@emotion/styled';
import { ReactComponent as BookmarkEmpty } from '../../images/icon-bookmark-empty.svg';
import { ReactComponent as BookmarkFull } from '../../images/icon-bookmark-full.svg';
import oval from '../../images/Oval.png';
import { ReactComponent as Movie } from '../../images/icon-category-movie.svg';
import { ReactComponent as TV } from '../../images/icon-category-tv.svg';

interface MovieCardProps {
  img: string;
  color: any;
  data: any;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ img, color, data, className }) => {
  return (
    <MovieCardBody className={className + ' movie-card-body d-flex flex-column'} color={color}>
      <div className="thumb">
        <img src={img} alt="logo" />
        <div className="bookmark d-flex flex-row justify-content-center align-items-center">
          {data?.isBookmarked ? <BookmarkFull /> : <BookmarkEmpty />}
        </div>
      </div>
      <div className="descr d-flex flex-column">
        <div className="props d-flex flex-row align-items-center">
          <p className="light">{data?.year}</p>
          <img src={oval} alt="Point" />
          <div className="d-flex flex-row align-items-center">
            {data?.category === 'Movie' ? <MovieMC /> : <TVMC />}
            <p className="light">{data?.category}</p>
          </div>
          <img src={oval} alt="Point" />
          <p className="light">{data?.rating}</p>
        </div>
        <h4>{data?.title}</h4>
      </div>
    </MovieCardBody>
  );
};

export default MovieCard;

type cssProp = {
  color: any;
};

const MovieMC = styled(Movie)`
  margin-right: 6px;
`;

const TVMC = styled(TV)`
  margin-right: 6px;
`;

const MovieCardBody = styled.div<cssProp>`
  margin-bottom: 32px;
  min-width: 240px;
  max-width: 350px;
  width: 100%;
  position: relative;
  top: 0px;

  .thumb {
    margin-bottom: 8px;
    width: 100%;
    height: 174px;
    position: relative;

    img {
      width: 100%;
      height: 174px;
      border-radius: 8px;
    }

    .bookmark {
      position: absolute;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      right: 5px;
      top: 5px;
      //text-align: center;
      //padding-top: 3px;
      background-color: ${({ color }) => color.grey50};
      cursor: pointer;
    }
  }

  .descr {
    position: relative;

    .props {
      margin-bottom: 5px;
      p {
        margin-right: 8px;
      }

      img {
        width: 3px;
        height: 3px;
        margin-right: 8px;
      }
    }
  }
`;
