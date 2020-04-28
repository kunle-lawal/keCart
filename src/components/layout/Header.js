import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Logo from './Logo'

class Header extends Component {
    state = {
       
    }

    render() {
        return (
            <>
                <header>
                    <Logo />
                    {/* <h1 className="title">Hello</h1> */}
                    {/* <div className="logo">
                        <h4>design</h4>
                    </div> */}
                </header>
            </>
        )
    }
}


export default Header;
