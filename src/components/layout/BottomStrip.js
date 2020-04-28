import React from 'react'

let BottomStrip = () =>  {
    return (
        <div className="bottom_strip">
            <div className="cart nav_item">
                <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="setting nav_item">
                <i className="fas fa-plus"></i>
            </div>
            <div className="setting nav_item">
                <i className="fas fa-cog"></i>
            </div>
        </div>
    )
}

export default BottomStrip
