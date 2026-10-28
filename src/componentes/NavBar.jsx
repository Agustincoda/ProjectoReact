import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

function NavBar() {
    const { cart } = useContext(CartContext);

    const totalQuantity = cart.reduce((total, producto) => total + producto.cantidad, 0);

    const infoTienda = {
        padding: 10
    };

    return (
        <>
            <header className="sticky-top">
                <nav id="linksToPages" className="navbar navbar-expand-lg navbar-light navbar-tienda">
                    <div className="container-fluid">
                        <div className="navbar-nav">
                            <Link to={'/'} className="nav-link">Inicio</Link>
                            <Link to={'/productos'} className="nav-link">Productos</Link>
                            <div className="nav-item dropdown">
                                <button type="button" className="nav-link dropdown-toggle" id="categoriasDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorías
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
                                    <li><Link to={'/productos/categoria/heroes'} className="dropdown-item">Guerreros definitivos</Link></li>
                                    <li><Link to={'/productos/categoria/villanos'} className="dropdown-item">Villanos temibles</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-flex align-items-center" style={infoTienda}>
                            <p className="mb-0 info-tienda-item nombre-tienda">Dragon Store</p>
                            <Link to={'/'}>
                                <img src='/Images/logo.png' width={50} height={50} className="info-tienda-item" alt="Dragon Store, ir al inicio"/>
                            </Link>
                            <Link to={'/carrito'} className="nav-link info-tienda-item d-flex align-items-center" aria-label={`Carrito: ${totalQuantity} ${totalQuantity === 1 ? 'producto' : 'productos'}`}>
                                <img src='/Images/carrito.png' width={30} height={30} className="me-2" alt="" />
                                <span className="contador-carrito">{totalQuantity}</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavBar;
