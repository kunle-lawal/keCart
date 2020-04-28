import React, { Component } from 'react'
import { signUp, login } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import Logo from './Logo'

export class Intro extends Component {
    state = {
        signingIn: false,
        method: ''
    }

    signUpUser = (e) => {
        const auth = this.props.auth;
        if (auth.uid) { return 0 }
        this.props.signUp(e.target.id, )
    }

    signingIn = (e) => {
        this.setState({
            signingIn: true,
            method: e.target.id
        })
    }

    componentDidMount() {
        // console.log(this.props.auth.providerData);
        if (this.props.auth.uid && this.props.auth.providerData.length > 0) {
            this.props.login(this.props.auth.providerData[0].providerId);
        }
    }

    render() {
        const auth = this.props.auth;
        // console.log(this.props.profileData);
        // console.log(this.state);
        return (
            <div className={(auth.uid ? "intro_container has_signed_in" : "intro_container")}>
                <Logo/>
                <div className="intro">
                    <div className="hello">
                        <h1>
                            {(!auth.uid) ? 'Hello!' : `Welcome back {name}`}
                        </h1>
                    </div>
                    { (() => {
                        if (auth.uid) { return null }
                        return (
                            <>
                                
                            </>
                        )
                        })()
                    }
                </div>
            </div>
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
        signUp: (type, username) => dispatch(signUp(type, username)),
        login: (type) => dispatch(login(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
