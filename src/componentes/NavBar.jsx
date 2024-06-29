import React from 'react';
import Carrito from './CartWidget';

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
                        <a className="nav-link" href="./index.html">Home</a>
                        <a className="nav-link" href="./index.html">Productos</a>
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="categoriasDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorías
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
                                <li><a className="dropdown-item" href="./index.html">Guerreros definitivos</a></li>
                                <li><a className="dropdown-item" href="./index.html">Villanos temibles</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center " style={infoTienda}>
                        <p className="mb-0 info-tienda-item nombre-tienda">Dragon Store</p>
                        <img src='Images/logoTienda.jpg' width={50} height={50} className="info-tienda-item" alt="Logo Tienda"/>
                        <a className="nav-link info-tienda-item" href="./index.html"><Carrito /></a>
                    </div>
                </div>
            </nav>
            </header>
        </>
    );
}

export default NavBar;
