import { useState } from 'react';

const ItemCount = ({ stock, onAdd }) => {
    const [cantidad, setCantidad] = useState(1);

    const handleAdd = () => {
        if (cantidad <= stock) {
            onAdd(cantidad);
        }
    };

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
            <button 
                onClick={() => setCantidad(cantidad - 1 > 0 ? cantidad - 1 : 1)}
                className="btn btn-outline-primary"
                aria-label="Restar una unidad"
            >
                Quitar
            </button>
            <span className="mx-2 fw-bold fs-5" aria-live="polite"><span className="visually-hidden">Cantidad: </span>{cantidad}</span>
            <button 
                onClick={() => setCantidad(cantidad + 1 <= stock ? cantidad + 1 : stock)}
                className="btn btn-outline-primary"
                aria-label="Sumar una unidad"
            >
                Agregar
            </button>
            <button 
                onClick={handleAdd}
                className="btn btn-primary ms-sm-3"
                disabled={stock < 1}
            >
                {stock < 1 ? 'Sin stock' : 'Añadir al carrito'}
            </button>
        </div>
    );
};

export default ItemCount;
