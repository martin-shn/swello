import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { onLogin } from '../store/actions/user.actions'
import { HomeFooter } from '../cmps/home-footer'
import { ReactComponent as FlatIcon } from '../assets/svg/flat-icon.svg';
import { ReactComponent as GoogleIcon } from '../assets/svg/google-icon.svg';
import { ReactComponent as LoginLeft } from '../assets/svg/login-left.svg';
import { ReactComponent as LoginRight } from '../assets/svg/login-right.svg';



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
