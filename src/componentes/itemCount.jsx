import React, { useState } from 'react';

const ItemCount = ({ stock, onAdd }) => {
    const [cantidad, setCantidad] = useState(1);

    const handleAdd = () => {
        if (cantidad <= stock) {
            onAdd(cantidad);
        }
    };

    return (
        <div className="d-flex align-items-center">
            <button 
                onClick={() => setCantidad(cantidad - 1 > 0 ? cantidad - 1 : 1)}
                className="btn btn-danger"
            >
                Quitar
            </button>
            <span className="mx-3">{cantidad}</span>
            <button 
                onClick={() => setCantidad(cantidad + 1 <= stock ? cantidad + 1 : stock)}
                className="btn btn-success"
            >
                Agregar
            </button>
            <button 
                onClick={handleAdd}
                className="btn btn-primary ms-3"
            >
                Añadir al carrito
            </button>
        </div>
    );
};

export default ItemCount;
