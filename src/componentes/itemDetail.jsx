import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { CartContext } from './CartContext';
import ItemCount from './itemCount';
import Swal from 'sweetalert2';
import usePagina from './usePagina';
import imagenSegura from './imagenSegura';
import formatoPrecio from './formatoPrecio';

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
                <h1 className="display-5 mb-4">{titulos[estado]}</h1>
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
                    <div className="card tarjeta-producto detalle-producto">
                        <div className="row g-0">
                            <div className="col-md-5 tarjeta-producto__imagen">
                                <img
                                    src={imagenSegura(producto.Imagen)}
                                    alt={producto.Nombre}
                                />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body h-100 d-flex flex-column justify-content-center text-center p-4 p-lg-5">
                                    <h1 className="card-title display-5">{producto.Nombre}</h1>
                                    <p className="card-text fs-5">{producto.Descripcion}</p>
                                    <p className="card-text precio fs-3 mb-1">{formatoPrecio(producto.Precio)}</p>
                                    <p className="card-text texto-suave">Stock disponible: {producto.Stock}</p>
                                    <div className="d-flex flex-column align-items-center mt-2">
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
