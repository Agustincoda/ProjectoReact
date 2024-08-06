import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (producto, cantidad) => {
        if (isInCart(producto.id)) {
            const newCart = cart.map(item => 
                item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
            );
            setCart(newCart);
        } else {
            setCart([...cart, { ...producto, cantidad }]);
        }
    };

    const removeItem = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (id) => {
        return cart.some(producto => producto.id === id);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
