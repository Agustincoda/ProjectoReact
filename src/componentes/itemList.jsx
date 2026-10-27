import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import usePagina from './usePagina';

const NOMBRES_CATEGORIAS = {
    heroes: 'Guerreros definitivos',
    villanos: 'Villanos temibles',
};

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const { categoria } = useParams();
    const titulo = categoria ? (NOMBRES_CATEGORIAS[categoria] ?? 'Productos') : 'Productos';
    usePagina(titulo);

    useEffect(() => {
        const fetchProductos = async () => {
            const db = getFirestore();
            let q = collection(db, "Productos");

            if (categoria) {
                q = query(q, where("Categoria", "==", categoria));
            }

            const querySnapshot = await getDocs(q);
            setProductos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchProductos();
    }, [categoria]);

    if (!productos || productos.length === 0) {
        return (
            <div className="container my-5">
                <h1 className="h2 mb-4">{titulo}</h1>
                <p>No hay productos disponibles.</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="h2 mb-4">{titulo}</h1>
            <div className="row">
                {productos.map(producto => (
                    <div className="col-md-4 d-flex align-items-stretch justify-content-center mb-4" key={producto.id}>
                        <div className="card d-flex flex-column" style={{ height: '100%', width: '100%', maxWidth: '300px' }}>
                            <img 
                                src={producto.Imagen} 
                                className="card-img-top" 
                                alt={producto.Nombre} 
                                style={{ height: '100%', objectFit: 'cover' }} 
                            />
                            <div className="card-body d-flex flex-column text-center">
                                <h2 className="card-title h5">{producto.Nombre}</h2>
                                <p className="card-text">${producto.Precio}</p>
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
