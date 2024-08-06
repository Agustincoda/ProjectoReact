import { Link } from 'react-router-dom';

function NavBar() {
    const fondoNaranja = {
        backgroundColor: '#FF934F',
        color: 'black',
        padding: 5,
        width: '100%'
    };

    const infoTienda = {
        padding: 10
    };

    return (
        <>
            <header>
                <nav style={fondoNaranja} id="linksToPages" className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <div className="navbar-nav">
                            <Link to={'/'} className="nav-link">Home</Link>
                            <Link to={'/productos'} className="nav-link">Productos</Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="categoriasDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorías
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
                                    <li><Link to={'/productos/categoria/heroes'} className="dropdown-item">Guerreros definitivos</Link></li>
                                    <li><Link to={'/productos/categoria/villanos'} className="dropdown-item">Villanos temibles</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-flex align-items-center" style={infoTienda}>
                            <p className="mb-0 info-tienda-item nombre-tienda">Dragon Store</p>
                            <Link to={'/'}>
                                <img src='/Images/logo.png' width={50} height={50} className="info-tienda-item" alt="Logo Tienda"/>
                            </Link>
                            <Link to={'/carrito'} className="nav-link info-tienda-item">0</Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavBar;
