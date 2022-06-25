import styled from '@emotion/styled';
import { time } from 'console';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../store/api';

interface IDetailsProps {
  color: any;
}

const baseURL = process.env.REACT_APP_TMDB_BASIC_PATH;
const apiKey = 'api_key=' + process.env.REACT_APP_TMDB_API_KEY;
const imgURL = process.env.REACT_APP_TMDB_IMG_PATH;

const Details: React.FC<IDetailsProps> = ({ color }) => {
  let { mediaId } = useParams();
  const [mediaDetail, setMediaDetail] = useState<any>();

  const formData = {
    url: 'movie',
    method: 'get',
  };

  useEffect(() => {
    let searchUrl = baseURL + formData.url + '/' + mediaId + '?' + apiKey;
    getData(searchUrl, formData.method).then((res) => {
      console.log(res);
      setMediaDetail(res);
    });
  }, []);
  console.log('Details', mediaId);

  return (
    <MediaDetail color={color}>
      <div
        className="bg"
        style={{ backgroundImage: `url(${imgURL + '/' + mediaDetail?.backdrop_path})` }}
      ></div>
      <div className="fg d-flex flex-row">
        <img src={imgURL + '/' + mediaDetail?.poster_path} alt="foto" />
        <div className="fg-details d-flex flex-column">
          <h1>{mediaDetail?.title}</h1>
          <h3 className="normal">({mediaDetail?.release_date.split('-')[0]})</h3>
          <h5>
            {mediaDetail?.genres.map((item: any) => {
              return item.name + ', ';
            })}
            Vote: {mediaDetail?.vote_average}
          </h5>
          <h4 className="styled">{mediaDetail?.tagline}</h4>
          <h4>Overview</h4>
          <p>{mediaDetail?.overview}</p>
        </div>
      </div>
    </MediaDetail>
  );
};

export default Details;

type dashCSSProps = {
  color: any;
};

const MediaDetail = styled.div<dashCSSProps>`
  h1 {
    margin-bottom: 32px;
  }
  .bg {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: lighten;

    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }

  .fg {
    padding: 32px;
    position: relative;
    z-index: 1;

    img {
      max-width: 40%;
    }

    .fg-details {
      padding: 32px;

      h1 {
        margin-bottom: 8px;
      }

      .normal {
        font-weight: 100;
        margin-bottom: 32px;
        color: ${({ color }) => color.greyishBlue};
      }

      .styled {
        font-weight: 100;
        font-size: 24px;
        margin-top: 24px;
        margin-bottom: 24px;
        font-style: italic;
        color: ${({ color }) => color.greyishBlue};
      }
    }
  }
`;
