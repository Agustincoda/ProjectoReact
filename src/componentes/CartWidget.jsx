import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import usePagina from './usePagina';

function Carrito() {
    const { cart, removeItem, clearCart, getTotalPrice } = useContext(CartContext);
    usePagina('Carrito');

    return (
        <div className="container my-5">
            <h1 className="h2">Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map(producto => (
                            <li key={producto.id} className="list-group-item d-flex align-items-center">
                                <img 
                                    src={producto.Imagen} 
                                    alt="" 
                                    style={{ height: '100px', width: 'auto', marginRight: '15px', border: '1px solid black' }} 
                                />
                                <div className="d-flex flex-column flex-grow-1">
                                    <h2 className="h5 mb-1">{producto.Nombre}</h2>
                                    <p className="mb-1">Precio: ${producto.Precio}</p>
                                    <p className="mb-1">Cantidad: {producto.cantidad}</p>
                                </div>
                                <button 
                                    onClick={() => removeItem(producto.id)} 
                                    className="btn btn-danger ms-3"
                                    aria-label={`Eliminar ${producto.Nombre} del carrito`}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3">
                        <button 
                            onClick={clearCart} 
                            className="btn btn-secondary"
                        >
                            Vaciar Carrito
                        </button>
                        <p className="h4 mt-3">Total: ${getTotalPrice()}</p>
                        <Link to="/checkout" className="btn btn-primary mt-3">Confirmar Compra</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrito;
