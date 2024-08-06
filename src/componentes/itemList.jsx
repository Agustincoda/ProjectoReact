import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrayProductos from '../assets/productos.json';

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const { categoria } = useParams();

    useEffect(() => {
        let productosFiltrados = arrayProductos;
        
        if (categoria) {
            productosFiltrados = arrayProductos.filter(producto => producto.categoria === categoria);
        }

        setProductos(productosFiltrados);
    }, [categoria]);

    if (!productos || productos.length === 0) {
        return <div>No hay productos disponibles.</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                {productos.map(producto => (
                    <div className="col-md-4" key={producto.id}>
                        <div className="card mb-4">
                            <img src={producto.imagen} className="card-img-top" alt={producto.name} />
                            <div className="card-body">
                                <h5 className="card-title">{producto.name}</h5>
                                <p className="card-text">{producto.description}</p>
                                <p className="card-text">Precio: ${producto.precio}</p>
                                <Link to={`/productos/${producto.id}`} className="btn btn-primary">Ver Detalles</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostrarProductos;
