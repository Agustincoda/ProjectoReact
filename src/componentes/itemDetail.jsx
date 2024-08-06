import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import arrayProductos from "../assets/productos.json";
import { CartContext } from "./CartContext.jsx";
import ItemCount from "./itemCount.jsx";

const DetalleProducto = () => {
    const { addItem } = useContext(CartContext);
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    const onAdd = (cantidad) => {
        addItem(producto, cantidad);
    }

    useEffect(() => {
        const productoEncontrado = arrayProductos.find(item => item.id === parseInt(id));
        setProducto(productoEncontrado);
    }, [id]);

    if (!producto) return <div>Loading...</div>;

    return (
        <div className="container my-5">
            <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img
                    src={producto.imagen}
                    className="card-img"
                    alt={producto.name}
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{producto.name}</h5>
                    <p className="card-text">{producto.description}</p>
                    <p className="card-text">Stock: {producto.stock}</p>
                    <p className="card-text">Precio: ${producto.precio}</p>
                    <div className="row">
                        <ItemCount stock={producto.stock} onAdd={onAdd} />
                        <div className="col text-center">
                            <Link to="../productos">
                                <button type="button" className="btn btn-secondary">Volver al catálogo</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;
