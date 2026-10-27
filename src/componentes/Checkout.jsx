import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';
import { getFirestore, doc, getDoc, writeBatch, increment, collection, addDoc } from 'firebase/firestore';

const Checkout = () => {
    const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' });
    const [enviando, setEnviando] = useState(false);
    const { cart, clearCart, getTotalPrice } = useContext(CartContext);
    const navigate = useNavigate();

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (enviando || cart.length === 0) return;
        setEnviando(true);
        const db = getFirestore();
        const outOfStockItems = [];

        for (const item of cart) {
            const docRef = doc(db, 'Productos', item.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const productData = docSnap.data();
                if (item.cantidad > productData.Stock) {
                    outOfStockItems.push(productData.Nombre);
                }
            }
        }

        if (outOfStockItems.length > 0) {
            Swal.fire({
                title: 'Error',
                text: `No hay suficiente stock para los siguientes productos: ${outOfStockItems.join(', ')}`,
                icon: 'error',
            });
            setEnviando(false);
            return;
        }

        try {
            const batch = writeBatch(db);

            cart.forEach(item => {
                const docRef = doc(db, 'Productos', item.id);
                batch.update(docRef, {
                    Stock: increment(-item.cantidad),
                });
            });


            const order = {
                buyer,
                items: cart.map(item => ({
                    id: item.id,
                    title: item.Nombre,
                    price: item.Precio,
                    quantity: item.cantidad,
                })),
                total: getTotalPrice(),
            };

            await batch.commit();

    
            await addDoc(collection(db, 'buyers'), {
                ...order,
                createdAt: new Date(),
            });

            clearCart();
            await Swal.fire({
                title: 'Compra confirmada',
                text: `Gracias por tu compra, ${buyer.name}!`,
                icon: 'success',
                confirmButtonText: 'Volver a la tienda',
            });
            navigate('/productos');
        } catch (error) {
            setEnviando(false);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al confirmar la compra. Por favor, inténtelo de nuevo.',
                icon: 'error',
            });
        }
    };

    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    if (cart.length === 0 && !enviando) {
        return (
            <div className="container my-5">
                <h2>Confirmar Compra</h2>
                <p>Tu carrito está vacío.</p>
                <Link to="/productos" className="btn btn-primary">Ver productos</Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2>Confirmar Compra</h2>
            <form onSubmit={handleConfirm}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={buyer.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        value={buyer.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={buyer.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={enviando}
                >
                    {enviando ? 'Procesando...' : 'Confirmar Compra'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
