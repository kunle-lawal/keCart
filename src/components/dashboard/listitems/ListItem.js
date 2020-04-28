import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateCartItem } from '../../../store/actions/listActions'

class ListItem extends Component {
    state = {
        
    }

    toggleCheck = (e) => {
        let id = e.target.id;
        // console.log(id, this.props.item.checked);
        this.props.updateCartItem(this.props.currentDoc, {
            id: id,
            key: "checked",
            data: !this.props.item.checked
        })
    }
    
    componentDidMount() {
        
    }

    render() {
        let item = this.props.item;
        // console.log(item);
        return (
            <div className={"list_item_container " + (item.checked ? "checked" : "")} id={item.id} onClick={this.toggleCheck} style={item.checked ? { 'opacity': '0.7' } : {}}>
                <div className="list_item" id={item.id}>
                    <div className="list_info" id={item.id}>
                        <h3 className="list_title" id={item.id} style={item.checked ? {'textDecoration': 'line-through'} : {}}>{item.item}</h3>
                        <h4 className="list_total" id={item.id}>{`${item.total} Total`}</h4>
                    </div>
                    <span className="not_checked" id={item.id}><i className="fas fa-hole" id={item.id}></i></span>
                    <span className={`checked ${!item.checked ? 'display_none' : ''}`} id={item.id}>
                        <i id={item.id} className="fas fa-check"></i>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCartItem: (uid, newArray) => dispatch(updateCartItem(uid, newArray))
    }
}


export default compose(
    connect(undefined, mapDispatchToProps),
)(ListItem);