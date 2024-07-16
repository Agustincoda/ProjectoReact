import { useEffect, useState } from "react";
import arrayProductos from "../assets/productos.json";
import { useParams } from "react-router-dom";

function MostrarProductos() {
    const [items, setItems] = useState([]);
    const { categoria, id } = useParams();

    useEffect(() => {
        if (id) {
            setItems(arrayProductos.filter(item => item.id == id));
        } else if (categoria) {
            setItems(arrayProductos.filter(item => item.categoria == categoria));
        } else {
            setItems(arrayProductos);
        }
    }, [categoria, id]);

    return (
        <div className="container my-5">
            <div className={`row ${items.length === 1 ? 'justify-content-center' : ''}`}>
                {items.map(figura => (
                    <div key={figura.id} className="col-md-4">
                        <div className="card border-dark mb-4">
                            <img 
                                src={figura.imagen} 
                                className="card-img-top" 
                                alt={figura.name} 
                            />
                            <div className="card-body text-center">
                                <p className="card-title font-weight-bold">{figura.name}</p>
                                <p className="card-text">{figura.description}</p>
                                <p className="card-text">Stock: {figura.stock}</p>
                                <p className="card-text">Precio: ${figura.precio}</p>
                                <div className="row">
                                    <button type="button" className="btn btn-warning">Comprar</button>
                                </div>    
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostrarProductos;
