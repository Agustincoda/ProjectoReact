import { Link } from 'react-router-dom';
import imagenSegura from './imagenSegura';
import formatoPrecio from './formatoPrecio';
import Revelar from './Revelar';

// Tarjeta de producto del catálogo y de los destacados del inicio
const Item = ({ producto, indice = 0, nivelTitulo = 'h2' }) => {
    const Titulo = nivelTitulo;

    return (
        <Revelar className="col-6 col-lg-4 d-flex mb-4" retraso={(indice % 3) * 120}>
            <article className="card tarjeta-producto w-100">
                <div className="tarjeta-producto__imagen">
                    <img src={imagenSegura(producto.Imagen)} alt={producto.Nombre} loading="lazy" />
                </div>
                <div className="card-body d-flex flex-column text-center">
                    <Titulo className="card-title h5">{producto.Nombre}</Titulo>
                    <p className="card-text precio">{formatoPrecio(producto.Precio)}</p>
                    <Link
                        to={`/productos/${producto.id}`}
                        className="btn btn-primary mt-auto"
                        aria-label={`Ver detalles de ${producto.Nombre}`}
                    >
                        Ver detalles
                    </Link>
                </div>
            </article>
        </Revelar>
    );
};

export default Item;
