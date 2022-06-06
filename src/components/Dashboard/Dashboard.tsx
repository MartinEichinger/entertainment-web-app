import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styled from '@emotion/styled';
import Home from '../Home/Home';
import Movies from '../Movies/Movies';
import Series from '../Series/Series';
import Bookmarked from '../Bookmarked/Bookmarked';
import Logo from '../../images/logo.svg';
import { ReactComponent as TrendingSVG } from '../../images/icon-nav-home.svg';
import { ReactComponent as MoviesSVG } from '../../images/icon-nav-movies.svg';
import { ReactComponent as SeriesSVG } from '../../images/icon-nav-tv-series.svg';
import { ReactComponent as BookmarkedSVG } from '../../images/icon-nav-bookmark.svg';

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
  const debug = true;
  const dispatch = useAppDispatch();
  let location = useLocation();

  /*   useEffect(() => {
    if (debug) console.log('Dashboard/useEffect');
    getMovies().then((movies) => {
      dispatch(moviesReceived(movies));
    });
  }); */

  if (debug) console.log('Dashboard/render: ', location);

  return (
    <Dash className="d-flex flex-row">
      <Nav className="d-flex flex-column align-items-center" color={color}>
        <img src={Logo} alt="logo" />
        {navItems.map((item, i) => {
          let active = location.pathname === item.link;

          return (
            <Link to={item.link} className={active ? 'nav-row active' : 'nav-row'} key={i}>
              <item.icon />
            </Link>
          );
        })}
      </Nav>
      <Boards>
        <Routes>
          <Route path="home" element={<Home color={color} />}></Route>
          <Route path="movies" element={<Movies />}></Route>
          <Route path="series" element={<Series />}></Route>
          <Route path="bookmarked" element={<Bookmarked />}></Route>
        </Routes>
      </Boards>
    </Dash>
  );
};

export default Dashboard;

type dashCSSProps = {
  color: any;
};

const Dash = styled.div``;

const Nav = styled.div<dashCSSProps>`
  width: 96px;
  height: calc(100vh - 64px);
  margin: 32px;
  padding: 32px;
  background: ${({ color }) => color.lightBlack} 0% 0% no-repeat padding-box;
  opacity: 1;
  border-radius: 20px;

  img {
    width: 32px;
    margin-bottom: 55px;
  }

  a {
    text-decoration: none;

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

    img {
      height: 20px;
      width: 20px;
      margin-bottom: 0px;
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
  margin: 32px 0px 0px 4px;
  width: 100%;
  overflow: scroll-y;
`;
