import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../../store/api';
import { ReactComponent as BackSVG } from '../../images/icon-back-button.svg';

interface IDetailsProps {
  color: any;
}

const baseURL = process.env.REACT_APP_TMDB_BASIC_PATH as string;
const apiKey = 'api_key=' + process.env.REACT_APP_TMDB_API_KEY;
const imgURL = process.env.REACT_APP_TMDB_IMG_PATH;

type TMediaParams = {
  mediaId: string;
  mediaUrl: string;
};

const Details: React.FC<IDetailsProps> = ({ color }) => {
  let { mediaId, mediaUrl } = useParams<TMediaParams>();
  const [mediaDetail, setMediaDetail] = useState<any>();
  const navigate = useNavigate();
  const debug = 2;

  const formData = {
    method: 'get',
  };
  useEffect(() => {
    let searchUrl = baseURL + mediaUrl + '/' + mediaId + '?' + apiKey;
    if (debug > 0) console.log('useEffect: ', searchUrl);
    getData(searchUrl, formData.method).then((res) => {
      if (debug > 1) console.log(res);
      setMediaDetail(res);
    });
  }, [formData.method, mediaId, mediaUrl]);

  let title = mediaDetail?.title || mediaDetail?.original_name || 'no title';
  let release_date = mediaDetail?.release_date || mediaDetail?.first_air_date || '-';
  let overview = mediaDetail?.overview || '-';
  let tagline = mediaDetail?.tagline || '-';
  let vote_average = mediaDetail?.vote_average || '-';

  console.log('Details', mediaId);

  return (
    <MediaDetail color={color}>
      <div
        className="bg"
        style={{ backgroundImage: `url(${imgURL + '/' + mediaDetail?.backdrop_path})` }}
      ></div>
      <div className="d-flex flex-column">
        <BackSVGDt
          className="link"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="fg d-flex flex-row">
          <img src={imgURL + '/' + mediaDetail?.poster_path} alt="foto" />
          <div className="fg-details d-flex flex-column">
            <h1>{title}</h1>
            <h3 className="normal">({release_date?.split('-')[0]})</h3>
            <h5>
              {mediaDetail?.genres.map((item: any) => {
                return item.name + ', ';
              })}
              Vote: {vote_average}
            </h5>
            <h4 className="styled">{tagline}</h4>
            <h4>Overview</h4>
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </MediaDetail>
  );
};

export default Details;

type dashCSSProps = {
  color: any;
};

const BackSVGDt = styled(BackSVG)`
  margin: 32px 32px 0px;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const MediaDetail = styled.div<dashCSSProps>`
  .link {
    position: relative;
  }

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
