import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';
import { getFirestore, doc, getDoc, writeBatch, increment, collection, addDoc } from 'firebase/firestore';

const Checkout = () => {
    const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' });
    const { cart, clearCart, getTotalPrice } = useContext(CartContext);

    const handleConfirm = async () => {
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
                })),
                total: getTotalPrice(),
            };

            await batch.commit();

    
            await addDoc(collection(db, 'buyers'), {
                ...order,
                createdAt: new Date(),
            });

            Swal.fire({
                title: 'Compra confirmada',
                text: `Gracias por tu compra, ${buyer.name}!`,
                icon: 'success',
                confirmButtonText: 'Volver a la tienda',
            }).then((result) => {
                if (result.isConfirmed) {
                    clearCart();
                    window.location.href = '/productos';
                }
            });
        } catch (error) {
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

    return (
        <div className="container my-5">
            <h2>Confirmar Compra</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={buyer.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
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
                        value={buyer.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirm}
                >
                    Confirmar Compra
                </button>
            </form>
        </div>
    );
};

export default Checkout;
