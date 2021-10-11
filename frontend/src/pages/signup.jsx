import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { onSignup } from '../store/actions/user.actions';
import { HomeFooter } from '../cmps/home-footer';
import { ReactComponent as FlatIcon } from '../assets/svg/flat-icon.svg';
import { ReactComponent as GoogleIcon } from '../assets/svg/google-icon.svg';
import { ReactComponent as LoginLeft } from '../assets/svg/login-left.svg';
import { ReactComponent as LoginRight } from '../assets/svg/login-right.svg';
import GoogleLogin from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

class _Signup extends React.Component {
  state = {
    user: {
      username: '',
      fullname: '',
      password: '',
      imgUrl: '',
    },
    errMsg: '',
    isFromInvite: false
  };
  componentDidMount () {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) this.setState(prevState => ({ ...prevState, user: { ...prevState.user, username: userEmail } }));
    this.setState({ isFromInvite: this.props.match.path.startsWith('/invite') ? true : false });
  }
  componentWillUnmount () {
    sessionStorage.removeItem('userEmail');
  }
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(prevState => ({ ...prevState, user: { ...prevState.user, [field]: value } }));
  };
  onSuccess = res => {
    const { email, name, googleId, imageUrl } = res.profileObj;
    this.setState({ user: { username: email, fullname: name, password: googleId, imgUrl: imageUrl } }, this.onSignup);
  };
  onSignup = async ev => {
    if (ev) ev.preventDefault();
    const { user, isFromInvite } = this.state;
    const { boardId } = this.props.match.params;
    try {
      await this.props.onSignup(user);
      isFromInvite ? this.props.history.push(`/invite/${ boardId }`) : this.props.history.push('/board');
    } catch (err) {
      this.showErrorMsg(err);
    }
  };

  showErrorMsg = err => {
    this.setState({ errMsg: err.response.data.err });
  };

  render () {
    const { user, errMsg, isFromInvite } = this.state;
    return (
      <section className="signup">
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
        <form className="flex column align-center" onSubmit={this.onSignup}>
          {errMsg && (
            <div className="error">
              <p>{errMsg}</p>
            </div>
          )}
          <h1>Sign up for your account</h1>
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
            type="text"
            name="fullname"
            placeholder="Enter full name"
            value={user.fullname}
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
          <button type="submit">Sign up</button>
          <span>OR</span>
          <GoogleLogin
            clientId={clientId}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <div className="google-btn flex align-center justify-center" onClick={renderProps.onClick}>
                <GoogleIcon />
                <span className="label">Continue with Google</span>
              </div>
            )}
            isSignedIn={false}
          />
          <hr className="bottom-form-separator"></hr>
          <Link to={isFromInvite ? `/invite/${ this.props.match.params.boardId }/login` : '/login'}>Already have an account? Log in</Link>
        </form>
        <HomeFooter />
      </section>
    );
  }
}

const mapDispatchToProps = {
  onSignup,
};

export const Signup = connect(null, mapDispatchToProps)(_Signup);
