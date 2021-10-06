import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import { onLogin } from '../store/actions/user.actions';
import { HomeFooter } from '../cmps/home-footer';
import { ReactComponent as FlatIcon } from '../assets/svg/flat-icon.svg';
import { ReactComponent as GoogleIcon } from '../assets/svg/google-icon.svg';
import { ReactComponent as LoginLeft } from '../assets/svg/login-left.svg';
import { ReactComponent as LoginRight } from '../assets/svg/login-right.svg';

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

// LOGOUT function:
// onSuccess = () => {
//     console.log('User logged out successfully');
// }

// <GoogleLogout
//     clientId={clientId}
//     buttonText="Logout"
//     onLogoutSuccess={this.onSuccess}
// ></GoogleLogout>

// source code from: https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del

class _Login extends React.Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    errMsg: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(prevState => ({ ...prevState, user: { ...prevState.user, [field]: value } }));
  };

  onLogin = async ev => {
    if (ev) ev.preventDefault();
    const { user } = this.state;
    try {
      await this.props.onLogin(user, this.showErrorMsg);
      this.props.history.push('/board');
    } catch (err) {
      this.showErrorMsg(err);
    }
  };

  showErrorMsg = err => {
    console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    this.setState({ errMsg: 'Invalid username/password' });
  };

  onSuccess = res => {
    const { email, googleId } = res.profileObj;
    this.setState({ user: { username: email, password: googleId } }, this.onLogin);
  };

  onFailure = err => {
    console.log('Login failed', err);
    this.setState({ errMsg: 'Failed to login with google' });
  };

  render() {
    const { user, errMsg } = this.state;
    return (
      <section className="login">
        <div className="login-left-img">
          <LoginLeft />
        </div>
        <div className="login-right-img">
          <LoginRight />
        </div>
        <Link to="/" className="header-logo flex align-center justify-center">
          <FlatIcon />
          <span>Swello</span>
        </Link>
        <form className="flex column align-center" onSubmit={this.onLogin}>
          {errMsg && (
            <div className="error">
              <p>{errMsg}</p>
            </div>
          )}
          <h1>Log in to Swello</h1>
          <input
            autoCorrect="off"
            type="email"
            name="username"
            placeholder="Enter email"
            value={user.username}
            onChange={this.handleChange}
            required
          />
          <input
            autoCorrect="off"
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={this.handleChange}
            autoComplete="suggesed-password"
            required
          />
          <button type="submit">Log in</button>
          <span>OR</span>
          {/* <div className="google-btn flex align-center justify-center">
            <GoogleIcon />
            <span className="label">Continue with Google</span>
          </div> */}
          <GoogleLogin
            clientId={clientId}
            // buttonText='Continue with Google'
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={'single_host_origin'}
            // style={{}}
            render={renderProps => (
              <div className="google-btn flex align-center justify-center" onClick={renderProps.onClick}>
                <GoogleIcon />
                <span className="label">Continue with Google</span>
              </div>
            )}
            isSignedIn={false}
          />
          <hr className="bottom-form-separator"></hr>
          <Link to="/signup">New here? Sign up for an account</Link>
        </form>
        <HomeFooter />
      </section>
    );
  }
}

const mapDispatchToProps = {
  onLogin,
};

export const Login = connect(null, mapDispatchToProps)(_Login);
