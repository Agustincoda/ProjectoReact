import React, { useState } from "react";

const ItemCount = ({ stock, onAdd }) => {
    const [contador, setContador] = useState(1);
    const [itemStock, setItemStock] = useState(stock);
    const [visible, setVisible] = useState(true);

    const incrementar = () => {
        if (contador < itemStock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if (contador > 1) {
            setContador(contador - 1);
        }
    }

    const addToCart = () => {
        if (contador <= itemStock) {
            setItemStock(itemStock - contador);
            onAdd(contador);
            setContador(1);
            setVisible(false);
            //hacer sweet alert que diga que agregue "contador" productos al carrito
        }
    }

    return (
        <>
            <h1>{contador}</h1>
            <button onClick={decrementar}>Quitar</button>
            <button onClick={addToCart}>Agregar al Carrito</button>
            <button onClick={incrementar}>Agregar</button>
        </>
    )
}

export default ItemCount;
