import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { CartContext } from './CartContext';
import ItemCount from './itemCount';
import Swal from 'sweetalert2';
import usePagina from './usePagina';
import imagenSegura from './imagenSegura';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [estado, setEstado] = useState('cargando');
    const { addItem } = useContext(CartContext);
    const titulos = { cargando: 'Cargando producto', 'no-existe': 'Producto no encontrado', error: 'Error al cargar el producto' };
    usePagina(producto ? producto.Nombre : titulos[estado]);

    useEffect(() => {
        const fetchProducto = async () => {
            setEstado('cargando');
            setProducto(null);
            try {
                const db = getFirestore();
                const docRef = doc(db, "Productos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                    setEstado('ok');
                } else {
                    setEstado('no-existe');
                }
            } catch {
                setEstado('error');
            }
        };

        fetchProducto();
    }, [id]);

    const handleAddToCart = (cantidad) => {
        addItem(producto, cantidad);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${producto.Nombre} agregado al carrito`,
            showConfirmButton: false,
            timer: 2000,
        });
    };

    if (!producto) {
        return (
            <div className="container my-5" aria-busy={estado === 'cargando'}>
                <h1 className="h2">{titulos[estado]}</h1>
                {estado === 'no-existe' && <p>El producto que buscás no existe o ya no está disponible.</p>}
                {estado === 'error' && <p>No pudimos cargar el producto. Revisá tu conexión e intentá de nuevo.</p>}
                {estado !== 'cargando' && <Link to="/productos" className="btn btn-primary">Ver productos</Link>}
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="row no-gutters">
                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                <img 
                                    src={imagenSegura(producto.Imagen)} 
                                    className="img-fluid" 
                                    alt={producto.Nombre} 
                                    style={{ maxHeight: '300px', objectFit: 'cover' }} 
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h1 className="card-title h2">{producto.Nombre}</h1>
                                    <p className="card-text">{producto.Descripcion}</p>
                                    <p className="card-text">Precio: ${producto.Precio}</p>
                                    <b className="card-text">Stock disponible: {producto.Stock}</b>
                                    <div className="d-flex flex-column align-items-center">
                                        <ItemCount stock={producto.Stock} onAdd={handleAddToCart} ></ItemCount>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;
