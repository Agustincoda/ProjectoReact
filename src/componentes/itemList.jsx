import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import usePagina from './usePagina';
import Item from './item';

const NOMBRES_CATEGORIAS = {
    heroes: 'Guerreros definitivos',
    villanos: 'Villanos temibles',
};

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [estado, setEstado] = useState('cargando');
    const { categoria } = useParams();
    const titulo = categoria ? (NOMBRES_CATEGORIAS[categoria] ?? 'Productos') : 'Productos';
    usePagina(titulo);

    useEffect(() => {
        const fetchProductos = async () => {
            setEstado('cargando');
            try {
                const db = getFirestore();
                let q = collection(db, "Productos");

                if (categoria) {
                    q = query(q, where("Categoria", "==", categoria));
                }

                const querySnapshot = await getDocs(q);
                setProductos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setEstado('ok');
            } catch {
                setEstado('error');
            }
        };

        fetchProductos();
    }, [categoria]);

    if (estado !== 'ok' || productos.length === 0) {
        const mensajes = {
            cargando: 'Cargando productos...',
            error: 'No pudimos cargar los productos. Revisá tu conexión e intentá de nuevo.',
            ok: 'No hay productos disponibles.',
        };
        return (
            <div className="container my-5" aria-busy={estado === 'cargando'}>
                <h1 className="display-5 mb-4">{titulo}</h1>
                <p>{mensajes[estado]}</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="display-5 mb-4">{titulo}</h1>
            <div className="row">
                {productos.map((producto, indice) => (
                    <Item key={producto.id} producto={producto} indice={indice} />
                ))}
            </div>
        </div>
    );
};

export default MostrarProductos;
