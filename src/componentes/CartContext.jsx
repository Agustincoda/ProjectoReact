import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (producto, cantidad) => {
        const itemIndex = cart.findIndex(item => item.id === producto.id);
        if (itemIndex !== -1) {
            const newCart = [...cart];
            newCart[itemIndex].cantidad += cantidad;
            setCart(newCart);
        } else {
            setCart([...cart, { ...producto, cantidad }]);
        }
    };

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.cantidad, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.Precio * item.cantidad, 0); // Usa 'Precio' en lugar de 'precio'
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotalQuantity, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

