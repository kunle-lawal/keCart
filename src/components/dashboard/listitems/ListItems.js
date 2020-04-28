import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import ListItem from './ListItem'

class ListItems extends Component {
    state = {
        item: '',
        total: 1
    }

    componentDidUpdate() {

    }

    render() {

        let list_items = this.props.cart ? this.props.cart : [];
        // console.log(this.props);
        return (
            <div className="lists">
                {list_items.length > 0 ? list_items.map((item, i) => {
                    return (
                        <ListItem
                            key={i}
                            item={item}
                            currentDoc={this.props.currentDoc}
                        />
                    )
                }) :
                    <div className="default_text">
                        <h4>Add some items</h4>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    // console.log(state);
    // console.log(props);
    let collection = `carts/${props.currentDoc}/cartItems`
    let cart = state.firestore.ordered[collection] ? state.firestore.ordered[collection] : []
    // console.log(cart);
    return {
        cart: cart,
        cartTotal: cart.length,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props, dispatch) => [
        {
            collection: `carts/${props.currentDoc}/cartItems`,
        }
    ])
)(ListItems);