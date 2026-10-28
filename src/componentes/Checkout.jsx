import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';
import usePagina from './usePagina';
import { getFirestore, doc, getDoc, writeBatch, increment, collection, addDoc } from 'firebase/firestore';

const Checkout = () => {
    const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' });
    const [enviando, setEnviando] = useState(false);
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    usePagina('Confirmar compra');

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (enviando || cart.length === 0) return;
        setEnviando(true);
        const db = getFirestore();

        try {
            // Precio y stock se leen de Firestore al comprar, no del carrito guardado en el navegador
            const itemsActuales = [];
            const outOfStockItems = [];

            for (const item of cart) {
                const docRef = doc(db, 'Productos', item.id);
                const docSnap = await getDoc(docRef);
                const productData = docSnap.exists() ? docSnap.data() : null;

                if (!productData || item.cantidad > productData.Stock) {
                    outOfStockItems.push(productData ? productData.Nombre : item.Nombre);
                } else {
                    itemsActuales.push({ ...item, Nombre: productData.Nombre, Precio: productData.Precio });
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

            const batch = writeBatch(db);

            itemsActuales.forEach(item => {
                const docRef = doc(db, 'Productos', item.id);
                batch.update(docRef, {
                    Stock: increment(-item.cantidad),
                });
            });


            const order = {
                buyer,
                items: itemsActuales.map(item => ({
                    id: item.id,
                    title: item.Nombre,
                    price: item.Precio,
                    quantity: item.cantidad,
                })),
                total: itemsActuales.reduce((total, item) => total + item.Precio * item.cantidad, 0),
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
                <h1 className="display-5 mb-4">Confirmar Compra</h1>
                <p>Tu carrito está vacío.</p>
                <Link to="/productos" className="btn btn-primary">Ver productos</Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="display-5 mb-4">Confirmar Compra</h1>
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
