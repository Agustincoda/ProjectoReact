import { useEffect, useState } from "react";
import arrayProductos from "../assets/productos.json";
import MostrarProductos from "./itemList";

const ItemListContainer = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const promesa = new Promise(resolve => {
            setTimeout(() => {
                resolve(arrayProductos);
            }, 2000);
        });

        promesa.then(response => {
            setItems(response);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <MostrarProductos items={items} />
            </div>
        </div>
    );
}

export default ItemListContainer;
