import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arrayProductos from "../assets/productos.json";
import DetalleProducto from "./itemDetail";

const ItemDetailContainer = () => {
    const [item, setItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const promesa = new Promise(resolve => {
            setTimeout(() => {
                resolve(arrayProductos.find(item => item.id === parseInt(id)));
            }, 2000);
        });

        promesa.then(response => {
            setItem(response);
        });
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <DetalleProducto item={item} />
            </div>
        </div>
    );
}

export default ItemDetailContainer;
