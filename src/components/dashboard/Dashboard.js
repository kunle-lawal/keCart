import React, { Component } from "react";
import Moment from 'react-moment';
import Intro from '../layout/Intro'
import SignInScreen from '../layout/SignInScreen'
import { addCart } from '../../store/actions/listActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import '../../css/main.css'

let search = () => {
    return (
        <div className="center">
            <input type="text"/>
        </div>
    )
}

class Dashboard extends Component {
    state = {
        cartName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }) 
    }

    addNewCart = () => {
        if (this.state.cartName.trim().length === 0) { return }
        // console.log(this.state.cartName)
        this.props.addCart(this.state.cartName)
    }

    componentDidMount() {
    }

    render() {
        // console.log(this.props)
        let lists = this.props.myLists ? this.props.myLists : [];
        return (
            <>
            {/* <Intro profileData={this.props.profile}/> */}
            <SignInScreen/>
            <div className="main_page ">
                <div className="page_items_container">
                    <div className="cart_container">
                        <h2>My carts</h2>
                        {/* <search/> */}
                        <div className="new_cart">
                            <div className="input">
                                <input type="text" className="add_new_list" id="cartName" placeholder="Cart name" value={this.state.cartName} onChange={this.handleChange}/>
                                <span className="add_cart" onMouseUp={this.addNewCart} style={(this.state.cartName.trim().length === 0) ? {'opacity': '0.7'} : {}}><i className="fas fa-plus"></i></span>
                            </div>
                        </div>
                        <div className="carts">
                            {lists.length > 0 ? lists.map((list, i) => {
                                let currDate = Date.now();
                                let dateSince = (currDate - list.date) / 1000 / 60 / 60 / 24;
                                return (
                                    <Link to={`/list/${list.cartRef}`} key={i}>
                                        <div className="cart_item_container" id={`list${i}`}>
                                            <div className="cart_item">
                                                <div className="cart_info">
                                                    <h3 className="cart_title">{list.cartName + (!list.cartName.includes("cart") ? " Cart" : "")}</h3>
                                                    <h4 className="cart_total">
                                                        <Moment format={dateSince > 6 ? "DD/MM/YYYY" : "ddd"}>
                                                            {list.date}
                                                        </Moment>
                                                    </h4>
                                                </div>
                                                <span className="goto_list"><i className="fas fa-arrow-right"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }) : 
                                <div className="default_text" style={{'opacity': '0.7'}}>
                                    <h4>Add a cart</h4>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

 
const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        myLists: state.firebase.profile.myLists,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCart: (cartName) => dispatch(addCart(cartName))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // firestoreConnect((props, dispatch) => [
    //     {
    //         collection: 'users/', doc: dispatch.getState().firebase.auth.uid
    //     }
    // ])
)(Dashboard);