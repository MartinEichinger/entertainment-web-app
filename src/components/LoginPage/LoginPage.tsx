import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, Link } from 'react-router-dom';
import { logInData, UserData } from '../../store/api';
import { useAppDispatch } from '../../store/hooks';
import { authReceived } from '../../store/authSlices';
import FormTextField from '../FormTextField/FormTextField';
import Logo from '../../images/logo.svg';

interface LoginProps {
  signup?: boolean;
  color: any;
}

const LoginPage: React.FC<LoginProps> = ({ signup = false, color }) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const debug = true;

  // internal states
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState({ eLogin: 2 as boolean | number, ePwd: 2 as boolean | number });

  const handleSubmit = () => {
    logInData().then((users: UserData[]) => {
      let data = { username: null as string | null, token: null as string | null };

      let index = users.findIndex((user) => {
        return user.username === login;
      });

      console.log(index);
      if (users[index].password === pwd) {
        console.log('Login worked');
        data.token = 'really difficult token';
        data.username = login;
      }
      if (data.token !== null) dispatch(authReceived(data));
      if (data?.token !== null) navigate('/dashboard/home/onboarding', { replace: true });
    });
  };

  if (debug) console.log('LoginPage', color);

  return (
    <Login color={color}>
      <div className="body d-flex flex-column align-items-center">
        <img src={Logo} alt="Logo" />
        {signup === false && (
          <div className="form d-flex flex-column align-items-start">
            <h1>Login</h1>

            <FormTextFieldLP
              color={color}
              form_title=""
              placeholder="Email address"
              value={login}
              error={error.eLogin}
              setValue={setLogin}
              setError={(val: boolean) => setError({ eLogin: val, ePwd: error.ePwd })}
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
              setError={(val: boolean) => setError({ eLogin: error.eLogin, ePwd: val })}
              required
            />

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={
                error.eLogin === true || error.ePwd === true || error.eLogin === 2 || error.ePwd === 2
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
          </div>
        )}

        {signup === true && (
          <div className="form d-flex flex-column align-items-start">
            <h1>Forgot your password</h1>
            <h2>Request a password reminder</h2>

            <FormTextFieldLP
              color={color}
              form_title="Email Address or Username"
              value={''}
              error={false}
              setValue={setLogin}
            />
            <div className="d-flex flex-row">
              <Button type="submit" color={color}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </Login>
  );
};

export default LoginPage;

interface loginCSSProps {
  color: any;
}

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
    }
  }
`;
