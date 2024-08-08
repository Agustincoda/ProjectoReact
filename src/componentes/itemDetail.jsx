import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import arrayProductos from '../assets/productos.json';
import { CartContext } from './CartContext';
import ItemCount from './ItemCount';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        const productoEncontrado = arrayProductos.find(p => p.id === parseInt(id));
        setProducto(productoEncontrado);
    }, [id]);

    const handleAddToCart = (cantidad) => {
        addItem(producto, cantidad);
    };

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={producto.imagen} className="img-fluid" alt={producto.name} />
                </div>
                <div className="col-md-6">
                    <h2>{producto.name}</h2>
                    <p>{producto.descripcion}</p>
                    <p>Precio: ${producto.precio}</p>
                    <ItemCount stock={producto.stock} onAdd={handleAddToCart} />
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;
