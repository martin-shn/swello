import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { onSignup } from '../store/actions/user.actions'
import { HomeFooter } from '../cmps/home-footer'
import { ReactComponent as FlatIcon } from '../assets/svg/flat-icon.svg';
import { ReactComponent as GoogleIcon } from '../assets/svg/google-icon.svg';
import { ReactComponent as LoginLeft } from '../assets/svg/login-left.svg';
import { ReactComponent as LoginRight } from '../assets/svg/login-right.svg';



class _Signup extends React.Component {
    state = {
        user: {
            username: '',
            fullname: '',
            password: '',
        },
        errMsg: ''
    }
    componentDidMount() {
        const userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) this.setState(prevState => ({ ...prevState, user: { ...prevState.user, username: userEmail } }))
    }
    componentWillUnmount() {
        sessionStorage.removeItem('userEmail')
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, user: { ...prevState.user, [field]: value } }))
    }
    onSignup = (ev) => {
        ev.preventDefault();
        const { user } = this.state;
        this.props.onSignup(user, this.showErrorMsg, this.props.history)
    }

    showErrorMsg = (err) => {
        this.setState({ errMsg: 'An error occured. Please try again later' })
    }
    render() {
        const { user, errMsg } = this.state;
        return (
            <section className="signup">
                <div className="login-left-img"><LoginLeft /></div>
                <div className="login-right-img"><LoginRight /></div>
                <Link to="/" className="header-logo flex align-center justify-center" >
                    <FlatIcon />
                    <span>Swello</span>
                </Link>
                <form className="flex column align-center" onSubmit={this.onSignup}>
                    {errMsg && <div className="error">
                        <p>{errMsg}</p>
                    </div>}
                    <h1>Sign up for your account</h1>
                    <input autoCorrect="off" type="email" name="username" placeholder="Enter email" value={user.username} onChange={this.handleChange} required />
                    <input autoCorrect="off" type="text" name="fullname" placeholder="Enter full name" value={user.fullname} onChange={this.handleChange} required />
                    <input autoCorrect="off" autoComplete="off" type="password" name="password" placeholder="Enter password" value={user.password} onChange={this.handleChange} autoComplete="suggesed-password" required />
                    <button type="submit">Sign up</button>
                    <span>OR</span>
                    <div className="google-btn flex align-center justify-center">
                        <GoogleIcon />
                        <span className="label">Continue with Google</span>
                    </div>
                    <hr className="bottom-form-separator"></hr>
                    <Link to="/login">Already have an account? Log in</Link>
                </form>
                <HomeFooter />
            </section>
        )
    }
}

const mapDispatchToProps = {
    onSignup
}


export const Signup = connect(null, mapDispatchToProps)(_Signup)
