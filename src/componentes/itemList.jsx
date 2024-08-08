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
                    <div className="col-md-4 d-flex align-items-stretch mb-4" key={producto.id}>
                        <div className="card d-flex flex-column" style={{ height: '100%', width: '300px' }}>
                            <img 
                                src={producto.imagen} 
                                className="card-img-top" 
                                alt={producto.name} 
                                style={{ height: '100%', objectFit: 'cover' }} 
                            />
                            <div className="card-body d-flex flex-column text-center">
                                <h5 className="card-title">{producto.name}</h5>
                                <Link to={`/productos/${producto.id}`} className="btn btn-primary mt-auto">Ver Detalles</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostrarProductos;
