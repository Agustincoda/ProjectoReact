import React from 'react';
import Carrito from './CartWidget';

function NavBar() {
    const fondoNaranja = {
        backgroundColor: 'orange',
        color: 'black',
        padding: 5,
        width: '100%'
    };

    return (
        <>
            <nav style={fondoNaranja} id="linksToPages" className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <div className="navbar-nav">
                        <a className="nav-link" href="./index.html">Home</a>
                        <a className="nav-link" href="./index.html">Productos</a>
                    </div>
                    <div className="d-flex">
                       <a className='nav-link' href='./index.html'> <Carrito /></a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;

