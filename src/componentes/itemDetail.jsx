import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { CartContext } from './CartContext';
import ItemCount from './itemCount';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        const fetchProducto = async () => {
            const db = getFirestore();
            const docRef = doc(db, "Productos", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProducto({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.error("No such document!");
            }
        };

        fetchProducto();
    }, [id]);

    const handleAddToCart = (cantidad) => {
        addItem(producto, cantidad);
    };

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="row no-gutters">
                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                <img 
                                    src={producto.Imagen} 
                                    className="img-fluid" 
                                    alt={producto.Nombre} 
                                    style={{ maxHeight: '300px', objectFit: 'cover' }} 
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h2 className="card-title">{producto.Nombre}</h2>
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
