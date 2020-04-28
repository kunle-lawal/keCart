import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { addCartItem, updateCartItem } from '../../store/actions/listActions'
import ListItems from './listitems/ListItems'
import '../../css/main.css'

class Dashboard extends Component {
    state = {
        item: '',
        total: 1
    }

    handleChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addItem = () => {
        if(this.state.item.trim().length === 0){return}
        let itemObj = {
            item: this.state.item,
            total: this.state.total,
            checked: false
        }
        this.props.addCartItem(this.props.match.params.id, itemObj);
        this.setState({
            item: '',
            total: 1,
        })
    }

    toggleCheck = (e) => {
        let items = this.props.cart;
        let id = e.target.id[e.target.id.length - 1];
        // console.log(items)
        items[id].checked = !items[id].checked;
        // console.log(items)
        this.props.updateCartItem(this.props.match.params.id, items)
    }

    addTotal = () => {
        let total = Number(this.state.total) + 1;
        this.setState({
            total: total
        })
    }

    subtractTotal = () => {
        let total = Number(this.state.total) > 2 ? Number(this.state.total) - 1 : 1;
        this.setState({
            total: total
        })
    }

    componentDidUpdate() {

    }

    render() {

        // let list_items = this.props.cart ? this.props.cart : [];
        // console.log(this.props);
        return (
            <div className="main_page">
                <div className="page_items_container">
                    <div className="list_container">
                        <div className="cart_info">
                            <Link to="/"><h2><span><i className="fas fa-arrow-left"></i></span> &nbsp; {this.props.cartName}</h2></Link>
                            <h4 className="total_products">{`${this.props.totalChecked}/${this.props.cartTotal}`}</h4>
                        </div>
                        <AddItem
                            handleChange={this.handleChange}
                            addItem={this.addItem}
                            text={this.state.item}
                            total={this.state.total}
                            subtractTotal={this.subtractTotal}
                            addTotal={this.addTotal}
                        />

                        <ListItems
                            currentDoc={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

let AddItem = (props) => {
    return (
        <div className="add_item">
            <div className="input">
                <input type="text" placeholder="New list item" id="item" onChange={props.handleChange} value={props.text}/>
                <span onClick={props.addItem} className="add_cart_item"><i className="fas fa-plus"></i></span>
            </div>
            <div className="change_total">
                <i className="fas fa-minus total_icons" onClick={props.subtractTotal} onKeyDown={props.subtractTotal} style={props.total <= 1 ? {'opacity': '0.7'} : {}}></i>
                <div className="list_total"><input type="number" className="" placeholder="x1" id="total" onChange={props.handleChange} value={props.total}/></div>
                <i className="fas fa-plus total_icons" onClick={props.addTotal} onKeyDown={props.addTotal}></i>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    console.log(ownProps.match.params.id);
    console.log(state.firestore.data.carts);
    let collection = `carts/${ownProps.match.params.id}/cartItems`
    let cartItems = state.firestore.ordered[collection] ? state.firestore.ordered[collection] : [];
    let cartData = state.firestore.data.carts ? state.firestore.data.carts[ownProps.match.params.id] : [];
    let totalChecked = cartItems.filter(item => item.checked);
    // console.log(cartData, ownProps.match.params.id);
    return {
        cart: cartItems,
        cartTotal: cartItems.length,
        totalChecked: totalChecked.length,
        cartName: cartData ? cartData.cartName : ''
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCartItem: (uid, item) => dispatch(addCartItem(uid, item)),
        updateCartItem: (uid, newArray) => dispatch(updateCartItem(uid, newArray))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props, dispatch) => [
        {
            collection: 'carts', doc: props.match.params.id
        }
    ])
)(Dashboard);