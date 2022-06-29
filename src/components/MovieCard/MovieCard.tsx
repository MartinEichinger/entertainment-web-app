import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mediaUpdated } from '../../store/mediaSlices';
import { ReactComponent as BookmarkEmpty } from '../../images/icon-bookmark-empty.svg';
import { ReactComponent as BookmarkFull } from '../../images/icon-bookmark-full.svg';
import oval from '../../images/Oval.png';
import { ReactComponent as Movie } from '../../images/icon-category-movie.svg';
import { ReactComponent as TV } from '../../images/icon-category-tv.svg';
import { ReactComponent as PlaySVG } from '../../images/icon-play.svg';

interface MovieCardProps {
  img: string;
  color: any;
  data: any;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ img, color, data, className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const debug = 0;

  let bookmarkedMedia = useAppSelector((state) => state.medias.allBookmarkedMedia);

  const toggleBookmark = () => {
    if (debug > 0) console.log('MovieCard/toggleBookmark', data);
    dispatch(mediaUpdated({ id: data.id }));
  };

  if (debug > 0) console.log('MovieCard: ', data, bookmarkedMedia);

  return (
    <MovieCardBody className={className + ' movie-card-body d-flex flex-column'} color={color}>
      <div className="thumb d-flex flex-column justify-content-center align-items-center">
        <img
          src={img}
          alt="logo"
          onClick={() => navigate('/dashboard/details/' + data.category + '/' + data.id)}
        />
        <div
          className="playbutton d-flex flex-row justify-content-center align-items-center"
          onClick={() => navigate('/dashboard/details/' + data.category + '/' + data.id)}
        >
          <PlaySVG />
          <h4>Play</h4>
        </div>
        <div
          className="bookmark d-flex flex-row justify-content-center align-items-center"
          onClick={() => toggleBookmark()}
        >
          {bookmarkedMedia.includes(data?.id) ? <BookmarkFull /> : <BookmarkEmpty />}
        </div>
      </div>
      <div className="descr d-flex flex-column">
        <div className="props d-flex flex-row align-items-center">
          <p className="light">{data?.year}</p>
          <img src={oval} alt="Point" />
          <div className="d-flex flex-row align-items-center">
            {data?.category === 'movie' ? <MovieMC /> : <TVMC />}
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

    &:hover {
      .playbutton {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 174px;
      border-radius: 8px;
      cursor: pointer;
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

    .playbutton {
      position: absolute;
      cursor: pointer;
      opacity: 0;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 28.5px;
      padding: 9px;

      h4 {
        margin-left: 19px;
        margin-right: 24px;
        margin-bottom: 0px;
        color: white;
      }
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
