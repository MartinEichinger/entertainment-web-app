import styled from '@emotion/styled';
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
    <MediaDetail>
      <h1>{mediaDetail?.title}</h1>
      <div
        className="bg"
        style={{ backgroundImage: `url(${imgURL + '/' + mediaDetail?.backdrop_path})` }}
      ></div>
      <div className="fg d-flex flex-row">
        <img src={imgURL + '/' + mediaDetail?.poster_path} alt="foto" />
        <div className="d-flex flex-column">
          <p>...{mediaDetail?.tagline}...</p>
          <h3>Overview</h3>
          <p>{mediaDetail?.overview}</p>
        </div>
      </div>
    </MediaDetail>
  );
};

export default Details;

const MediaDetail = styled.div`
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
  }
`;
