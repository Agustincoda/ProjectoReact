import { Link } from 'react-router-dom';

function Footer() {

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row gy-4 align-items-start">
                        <div className="col-md-5">
                            <p className="nombre-tienda mb-2">Dragon Store</p>
                            <p className="mb-0">Figuras S.H. Figuarts de Dragon Ball.</p>
                        </div>
                        <nav className="col-md-4" aria-label="Pie de página">
                            <ul className="list-unstyled mb-0">
                                <li><Link to="/productos">Productos</Link></li>
                                <li><Link to="/productos/categoria/heroes">Guerreros definitivos</Link></li>
                                <li><Link to="/productos/categoria/villanos">Villanos temibles</Link></li>
                                <li><Link to="/carrito">Carrito</Link></li>
                            </ul>
                        </nav>
                        <div className="col-md-3">
                            <p className="mb-0">¡Recordá seguirnos en Instagram! <strong>@figuarts</strong></p>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    );



}

export default Footer;
