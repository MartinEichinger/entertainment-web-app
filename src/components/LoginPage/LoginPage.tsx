import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logIn, signUp } from '../../store/authSlices';
import FormTextField from '../FormTextField/FormTextField';
import Logo from '../../images/logo.svg';
import { ReactComponent as TMDB } from '../../images/icon-tmdb.svg';

interface LoginProps {
  signup?: boolean;
  color: any;
}

const LoginPage: React.FC<LoginProps> = ({ signup = false, color }) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const debug = 0;

  // external states
  let authLoading = useAppSelector((state) => state.auth.loading);

  // internal states
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailUp, setEmailUp] = useState('');
  const [pwd2Up, setPwd2Up] = useState('');
  const [pwdUp, setPwdUp] = useState('');
  const [error, setError] = useState({
    eEmail: 2 as boolean | number,
    ePwd: 2 as boolean | number,
    ePwd2Up: 2 as boolean | number,
    ePwdUp: 2 as boolean | number,
    eEmailUp: 2 as boolean | number,
  });

  const handleLogin = () => {
    if (debug > 1) console.log('LoginPage/handleLogin: ', email, pwd);
    dispatch(logIn({ email: email, password: pwd }));
    navigate('/', { replace: true });
    setEmail('');
    setPwd('');
  };

  const handleSignUp = () => {
    if (debug > 1) console.log('LoginPage/handleSignUp', emailUp, pwdUp);
    dispatch(signUp({ email: emailUp, password: pwdUp }));
    navigate('/', { replace: true });
    setEmailUp('');
    setPwdUp('');
    setPwd2Up('');
  };

  if (debug > 0) console.log('LoginPage', color, authLoading);

  return (
    <Login color={color}>
      <div className="body d-flex flex-column align-items-center">
        <img src={Logo} alt="Logo" />
        {signup === false && (
          <div className="form d-flex flex-column align-items-start">
            <h1>Login</h1>

            {authLoading === true ? (
              <div className="spinner">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <FormTextFieldLP
                  color={color}
                  form_title=""
                  placeholder="Email address"
                  value={email}
                  error={error.eEmail}
                  setValue={setEmail}
                  setError={(val: boolean) => setError({ ...error, eEmail: val })}
                  required
                />
                <FormTextFieldLP
                  color={color}
                  form_title=""
                  placeholder="Password"
                  type="password"
                  value={pwd}
                  error={error.ePwd}
                  setValue={setPwd}
                  setError={(val: boolean) => setError({ ...error, ePwd: val })}
                  required
                />

                <Button
                  type="submit"
                  onClick={handleLogin}
                  disabled={
                    error.eEmail === true ||
                    error.ePwd === true ||
                    error.eEmail === 2 ||
                    error.ePwd === 2
                  }
                  color={color}
                >
                  Login to your account
                </Button>

                <p>
                  Don't have an account?
                  <Link className="link" to={'/signup'}>
                    Sign Up
                  </Link>
                </p>
              </>
            )}
          </div>
        )}

        {signup === true && (
          <div className="form d-flex flex-column align-items-start">
            <h1>Sign Up</h1>

            {authLoading === true ? (
              <div className="spinner">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <FormTextFieldLP
                  color={color}
                  form_title=""
                  placeholder="Email address"
                  value={emailUp}
                  error={error.eEmailUp}
                  setValue={setEmailUp}
                  setError={(val: boolean) => setError({ ...error, eEmailUp: val })}
                  required
                />

                <FormTextFieldLP
                  color={color}
                  form_title=""
                  placeholder="Password"
                  type="password"
                  value={pwdUp}
                  error={error.ePwdUp}
                  setValue={setPwdUp}
                  setError={(val: boolean) => setError({ ...error, ePwdUp: val })}
                  required
                />

                <FormTextFieldLP
                  color={color}
                  form_title=""
                  placeholder="Repeat password"
                  type="password"
                  value={pwd2Up}
                  error={error.ePwd2Up}
                  setValue={setPwd2Up}
                  setError={(val: boolean) => setError({ ...error, ePwd2Up: val })}
                  required
                />

                <Button
                  type="submit"
                  onClick={handleSignUp}
                  disabled={
                    error.eEmailUp === (true || 2) ||
                    error.ePwdUp === (true || 2) ||
                    error.ePwd2Up === (true || 2)
                  }
                  color={color}
                >
                  Create an account
                </Button>

                <p>
                  Already have an account?
                  <Link className="link" to={'/'}>
                    Login
                  </Link>
                </p>
              </>
            )}
          </div>
        )}
        <TMDBLP />
      </div>
    </Login>
  );
};

export default LoginPage;

interface loginCSSProps {
  color: any;
}

const TMDBLP = styled(TMDB)`
  max-width: 336px;
  margin-top: 84px;
`;

const Button = styled.button<loginCSSProps>`
  width: 336px;
  height: 48px;
  background: ${({ color }) => color.red} 0% 0% no-repeat padding-box;
  border-radius: 6px;
  font: normal normal 300 15px/15px Outfit;
  color: ${({ color }) => color.white};
  opacity: 1;
  margin-top: 40px;
  margin-bottom: 24px;
  border: 0px;

  &:disabled {
    background-color: ${({ color }) => color.red};
  }

  &:hover {
    background-color: ${({ color }) => color.white};
    color: ${({ color }) => color.black};
  }
`;

const FormTextFieldLP = styled(FormTextField)<loginCSSProps>`
  width: 336px;
  margin-right: 25px;
  margin-bottom: 10px;

  .form-control {
    margin-top: 6px;
    background-color: rgba(0, 0, 0, 0);
  }

  span {
  }
`;

const Login = styled.div<loginCSSProps>`
  height: 100vh;

  .body {
    height: inherit;
    background-color: ${({ color }) => color.black};

    img {
      width: 32px;
      margin-top: 78px;
      margin-bottom: 84px;
    }

    .form {
      padding: 32px;
      text-align: left;
      background-color: ${(props) => props.color.lightBlack};
      border-radius: 20px;

      h1 {
        margin-bottom: 40px;
      }

      .link {
        text-align: left;
        text-decoration: none;
        margin-left: 9px;
        color: ${(props) => props.color.red};

        &:focus-visible {
          outline: 0px;
        }
      }

      .spinner {
        width: 336px;
        margin-right: 25px;
        margin-bottom: 10px;
      }
    }
  }
`;
