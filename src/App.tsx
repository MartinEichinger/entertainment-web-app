import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { authStatus } from './store/authSlices';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';

const color = {
  red: 'rgba(252, 71, 71, 1)',
  black: 'rgba(16, 20, 30, 1)',
  lightBlack: 'rgba(22, 29, 47, 1)',
  greyishBlue: 'rgba(90, 105, 143, 1)',
  grey: 'rgba(151,151,151,1)',
  grey50: 'rgba(151,151,151,0.5)',
  white: 'rgba(255, 255, 255, 1)',
  font: 'rgba(255, 255, 255, 1)',
  bgFont: 'rgba(16,20,30,1)',
  border: 'rgba(90, 105, 143, 1)',
  borderActive: 'rgba(255, 255, 255, 1)',
  shadow: 'rgba(16,20,30,1)',
  warning: 'rgba(230, 20, 20, 1)',
  cursor: 'rgba(252, 71, 71, 1)',
  asterix: 'rgba(22, 29, 47, 1)',
};

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth_token: string | null = useAppSelector((state) => state.auth.token);
  let location = useLocation();

  if (auth_token === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  const dispatch = useAppDispatch();
  dispatch(authStatus());
  var auth_token: string | null = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth_token !== null ? (
            <Navigate to="/dashboard/home" replace={true} />
          ) : (
            <LoginPage color={color} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          auth_token !== null ? (
            <Navigate to="/dashboard/home" replace={true} />
          ) : (
            <LoginPage signup={true} color={color} />
          )
        }
      />
      <Route
        path="dashboard/*"
        element={
          <RequireAuth>
            <Dashboard color={color} />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}
