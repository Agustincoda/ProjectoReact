import React from "react";

const Item = ({ item }) => {
    return (
        <div className="col-md-4">
            <div className="card">
                <img src={item.imagen} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <p className="card-text">{item.name}</p>
                    <p className="card-text">${item.precio}</p>
                </div>
            </div>
        </div>
    );
}

export default Item;
