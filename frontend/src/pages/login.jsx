import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { onLogin } from '../store/actions/user.actions'
import { HomeFooter } from '../cmps/home-footer'
import { ReactComponent as FlatIcon } from '../assets/svg/flat-icon.svg';
import { ReactComponent as GoogleIcon } from '../assets/svg/google-icon.svg';
import { ReactComponent as LoginLeft } from '../assets/svg/login-left.svg';
import { ReactComponent as LoginRight } from '../assets/svg/login-right.svg';

// import {GoogleLogin} from 'react-google-login';

// GOOGLE_LOGIN_ID needs to be defined in .env file
// const clientId = `${env.enviroment.GOOGLE_LOGIN_ID}.apps.googleusercontent.com`;

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
            password: ''
        },
        errMsg: ''
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, user: { ...prevState.user, [field]: value } }))
    }

    onLogin = async (ev) => {
        ev.preventDefault();
        const { user } = this.state;
        try {
            await this.props.onLogin(user, this.showErrorMsg)
            this.props.history.push('/board')
        }
        catch(err) {
            this.showErrorMsg(err)
        }
    }

    showErrorMsg = (err) => {
        this.setState({ errMsg: 'Invalid username/password' })
    }

    onSuccess = (res) => {
        console.log('Login success - user:', res.profileObj);
        this.setState({username:res.profileObj.email, password: res.profileObj.id})
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

        const refreshToken = async () => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
            console.log('New auth', newAuthRes.id_token);
            // set the 2nd and after timout
            setTimeout(refreshToken, refreshTiming);
        };
        // set the 1st timeout
        setTimeout(refreshToken, refreshTiming);
        this.onLogin();
    }

    onFailure = (err) => {
        console.log('Login failed', err);
    }

    render() {
        const { user, errMsg } = this.state;
        return (
            <section className="login">
                <div className="login-left-img"><LoginLeft /></div>
                <div className="login-right-img"><LoginRight /></div>
                <Link to="/" className="header-logo flex align-center justify-center">
                    <FlatIcon />
                    <span>Swello</span>
                </Link>
                <form className="flex column align-center" onSubmit={this.onLogin}>
                    {errMsg && <div className="error">
                        <p>{errMsg}</p>
                    </div>}
                    <h1>Log in to Swello</h1>
                    <input autoCorrect="off" type="email" name="username" placeholder="Enter email" value={user.username} onChange={this.handleChange} required />
                    <input autoCorrect="off" type="password" name="password" placeholder="Enter password" value={user.password} onChange={this.handleChange} autoComplete="suggesed-password" required />
                    <button type="submit">Log in</button>
                    <span>OR</span>
                    <div className="google-btn flex align-center justify-center">
                        <GoogleIcon />
                        <span className="label">Continue with Google</span>
                    </div>
                    {/* <GoogleLogin
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
                        isSignedIn={true}
                    /> */}
                    <hr className="bottom-form-separator"></hr>
                    <Link to="/signup">New here? Sign up for an account</Link>
                </form>
                <HomeFooter />
            </section>
        )
    }
}

const mapDispatchToProps = {
    onLogin
}


export const Login = connect(null, mapDispatchToProps)(_Login)
