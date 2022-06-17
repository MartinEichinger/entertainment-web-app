import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logOut } from '../../store/authSlices';
import styled from '@emotion/styled';
import Home from '../Home/Home';
import Medias from '../Medias/Medias';
import Series from '../Series/Series';
import Bookmarked from '../Bookmarked/Bookmarked';
import Logo from '../../images/logo.svg';
import { ReactComponent as TrendingSVG } from '../../images/icon-nav-home.svg';
import { ReactComponent as MoviesSVG } from '../../images/icon-nav-movies.svg';
import { ReactComponent as SeriesSVG } from '../../images/icon-nav-tv-series.svg';
import { ReactComponent as BookmarkedSVG } from '../../images/icon-nav-bookmark.svg';
import avatar from '../../images/image-avatar.png';

const navItems = [
  { icon: TrendingSVG, name: '', link: '/dashboard/home' },
  { icon: MoviesSVG, name: '', link: '/dashboard/movies' },
  { icon: SeriesSVG, name: '', link: '/dashboard/series' },
  { icon: BookmarkedSVG, name: '', link: '/dashboard/bookmarked' },
];

interface DashboardProps {
  color: any;
}

const Dashboard: React.FC<DashboardProps> = ({ color }) => {
  const debug = false;
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useAppDispatch();

  if (debug) console.log('Dashboard/render: ', location);

  return (
    <>
      <Dash className="d-flex flex-column flex-lg-row" color={color}>
        <Nav
          className="navibar d-flex flex-row flex-lg-column align-items-center justify-content-between"
          color={color}
        >
          <img src={Logo} alt="logo" onClick={() => navigate('/', { replace: true })} />
          <div className="link-items d-flex flex-row flex-lg-column align-items-center">
            {navItems.map((item, i) => {
              let active = location.pathname === item.link;

              return (
                <Link to={item.link} className={active ? 'nav-row active' : 'nav-row'} key={i}>
                  <item.icon />
                </Link>
              );
            })}
          </div>
          <div className="avatar" onClick={() => dispatch(logOut())}>
            <img src={avatar} alt="Logo" />
          </div>
        </Nav>
        <Boards>
          <Routes>
            <Route path="home" element={<Home color={color} />}></Route>
            <Route path="movies" element={<Medias mediaType="movie" color={color} />}></Route>
            <Route path="series" element={<Medias mediaType="tv" color={color} />}></Route>
            <Route path="bookmarked" element={<Bookmarked />}></Route>
          </Routes>
        </Boards>
      </Dash>
    </>
  );
};

export default Dashboard;

type dashCSSProps = {
  color: any;
};

const Dash = styled.div<dashCSSProps>`
  @media (max-width: 991px) {
    &::before {
      content: '';
      background-color: ${({ color }) => color.black};
      width: 100vw;
      height: 33px;
      position: fixed;
      top: 0px;
      z-index: 9;
    }
  }
`;

const Nav = styled.div<dashCSSProps>`
  width: 96px;
  height: calc(100vh - 64px);
  margin: 32px;
  padding: 32px;
  background: ${({ color }) => color.lightBlack} 0% 0% no-repeat padding-box;
  opacity: 1;
  border-radius: 20px;

  @media (max-width: 991px) {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    height: 96px;
    width: calc(100vw - 50px);
    margin: 23px 25px;
    padding: 24px;
    border-radius: 10px;
  }

  @media (max-width: 575px) {
    width: 100vw;
    margin: 0px;
    padding: 16px;
    border-radius: 0px;
  }

  img {
    width: 32px;
    height: 26px;
    margin-bottom: 55px;

    @media (max-width: 991px) {
      margin-bottom: 0px !important;
    }

    @media (max-width: 575px) {
      width: 25px;
      height: 20px;
    }
  }

  .avatar {
    border: 1px solid white;
    border-radius: 50%;
    line-height: 1;
    cursor: pointer;

    img {
      height: 30px;
      width: 30px;
      margin-bottom: 0px;

      @media (max-width: 575px) {
        height: 22px;
        width: 22px;
      }
    }
  }

  a {
    text-decoration: none;
    line-height: 1px;

    svg {
      fill: ${({ color }) => color.greyishBlue};
    }

    &:hover {
      svg {
        fill: ${({ color }) => color.red};
      }
    }

    &.active {
      svg {
        fill: ${({ color }) => color.white};
      }
    }
  }

  .nav-row {
    padding: 20px;
    //width: 174px;
    border-radius: 4px;
    cursor: pointer;

    @media (max-width: 991px) {
      padding: 4px 16px;
    }

    @media (max-width: 575px) {
      padding: 4px 12px;
    }

    img {
      height: 20px;
      width: 20px;
      margin-bottom: 0px;

      @media (max-width: 575px) {
        height: 16px;
        width: 16px;
      }
    }

    p {
      margin: 0px;
      margin-left: 12px;
      text-align: left;
      font: normal normal 600 14px/18px Source Sans Pro;
      letter-spacing: 0px;
      color: #074f70;
      opacity: 1;
    }
  }
`;

const Boards = styled.div`
  margin: 32px 0px 20px 4px;
  width: 100%;
  position: relative;

  @media (max-width: 991px) {
    margin: 152px 25px 10px;
    width: calc(100vw - 50px);
  }

  @media (max-width: 575px) {
    margin: 129px 16px 10px;
    width: calc(100vw - 32px);
  }
`;
