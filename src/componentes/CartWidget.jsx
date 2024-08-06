import React, { useContext } from "react";
import { CartContext } from "./CartContext.jsx";

function Carrito() {
    const { cart, removeItem, clearCart } = useContext(CartContext);

    return (
        <div className="container my-5">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map(producto => (
                            <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{producto.name}</h5>
                                    <p>Precio: ${producto.precio}</p>
                                    <p>Cantidad: {producto.cantidad}</p>
                                </div>
                                <button onClick={() => removeItem(producto.id)} className="btn btn-danger">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3">
                        <button onClick={clearCart} className="btn btn-secondary">Vaciar Carrito</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrito;
