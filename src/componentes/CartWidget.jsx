import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import usePagina from './usePagina';
import imagenSegura from './imagenSegura';
import formatoPrecio from './formatoPrecio';

function Carrito() {
    const { cart, removeItem, clearCart, getTotalPrice } = useContext(CartContext);
    usePagina('Carrito');

    return (
        <div className="container my-5">
            <h1 className="display-5 mb-4">Carrito de Compras</h1>
            {cart.length === 0 ? (
                <>
                    <p>El carrito está vacío.</p>
                    <Link to="/productos" className="btn btn-primary">Ver productos</Link>
                </>
            ) : (
                <div>
                    <ul className="list-group shadow-sm">
                        {cart.map(producto => (
                            <li key={producto.id} className="list-group-item d-flex flex-wrap align-items-center gap-2 py-3">
                                <img
                                    src={imagenSegura(producto.Imagen)}
                                    alt=""
                                    className="miniatura-carrito"
                                />
                                <div className="d-flex flex-column flex-grow-1">
                                    <h2 className="h5 mb-1">{producto.Nombre}</h2>
                                    <p className="mb-1">Precio: <span className="precio fs-6">{formatoPrecio(producto.Precio)}</span></p>
                                    <p className="mb-1">Cantidad: {producto.cantidad}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(producto.id)}
                                    className="btn btn-danger ms-auto"
                                    aria-label={`Eliminar ${producto.Nombre} del carrito`}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <button
                            onClick={clearCart}
                            className="btn btn-outline-primary"
                        >
                            Vaciar Carrito
                        </button>
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            <p className="h4 mb-0">Total: <span className="precio fs-4">{formatoPrecio(getTotalPrice())}</span></p>
                            <Link to="/checkout" className="btn btn-primary btn-lg">Confirmar Compra</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrito;
