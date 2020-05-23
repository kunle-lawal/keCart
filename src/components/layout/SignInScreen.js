import React, { Component } from 'react'
import { signUp, login } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import Logo from './Logo'

export class SignInScreen extends Component {
    state = {
        signingIn: false,
        method: ''
    }

    signUpUser = (e) => {
        const auth = this.props.auth;
        if (auth.uid) { return 0 }
        this.props.signUp(e.target.id)
    }

    componentDidMount() {
        // console.log(this.props.auth.providerData);
        if (this.props.auth.uid && this.props.auth.providerData.length > 0) {
            this.props.login(this.props.auth.providerData[0].providerId);
        }
    }

    render() {
        const auth = this.props.auth;
        console.log(auth.uid)
        if (auth.uid) { return null }
        // console.log(this.props.profileData);
        // console.log(this.state);
        return (
            <>
            <div className="sign_in_container">
                <Logo/>
                <div className="intro_text">
                    <h1>
                        Feel Good <span>Shopping</span>
                    </h1>
                </div>
                <div className="sign_in">
                    <div className="signIn-buttons">
                        <button className={"signIn-buttons-google signIn_button btn "} id="google">
                            <i className="fab fa-google" id="google"></i>
                            <span id="google">Sign up with Google</span>
                        </button>
                    </div>
                    <h4>Don't want to sign up? <span id="anonymous" onClick={this.signUpUser}>Sign in Anonymously</span></h4>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        signedIn: state.signingIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (type) => dispatch(signUp(type)),
        login: (type) => dispatch(login(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
