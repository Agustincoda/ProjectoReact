import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import usePagina from './usePagina';
import imagenSegura from './imagenSegura';

const NOMBRES_CATEGORIAS = {
    heroes: 'Guerreros definitivos',
    villanos: 'Villanos temibles',
};

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [estado, setEstado] = useState('cargando');
    const { categoria } = useParams();
    const titulo = categoria ? (NOMBRES_CATEGORIAS[categoria] ?? 'Productos') : 'Productos';
    usePagina(titulo);

    useEffect(() => {
        const fetchProductos = async () => {
            setEstado('cargando');
            try {
                const db = getFirestore();
                let q = collection(db, "Productos");

                if (categoria) {
                    q = query(q, where("Categoria", "==", categoria));
                }

                const querySnapshot = await getDocs(q);
                setProductos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setEstado('ok');
            } catch {
                setEstado('error');
            }
        };

        fetchProductos();
    }, [categoria]);

    if (estado !== 'ok' || productos.length === 0) {
        const mensajes = {
            cargando: 'Cargando productos...',
            error: 'No pudimos cargar los productos. Revisá tu conexión e intentá de nuevo.',
            ok: 'No hay productos disponibles.',
        };
        return (
            <div className="container my-5" aria-busy={estado === 'cargando'}>
                <h1 className="h2 mb-4">{titulo}</h1>
                <p>{mensajes[estado]}</p>
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
                                src={imagenSegura(producto.Imagen)} 
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
