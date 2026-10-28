import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import usePagina from './usePagina';
import Revelar from './Revelar';
import Item from './item';
import Novedades from './Novedades';

const BANDOS = [
    {
        categoria: 'heroes',
        nombre: 'Guerreros definitivos',
        texto: 'Goku, Gohan, Piccolo y los que siempre defienden la Tierra.',
        imagen: '/Images/SSJ2GohanSHFiguart.jpg',
    },
    {
        categoria: 'villanos',
        nombre: 'Villanos temibles',
        texto: 'Cell, Freezer, Goku Black y los rivales más poderosos.',
        imagen: '/Images/PerfectcellSHFiguart.jpg',
    },
];

function Bienvenida({texto}) {
    usePagina('Inicio');
    const [destacados, setDestacados] = useState([]);
    const [estado, setEstado] = useState('cargando');

    useEffect(() => {
        const fetchDestacados = async () => {
            try {
                const db = getFirestore();
                const q = query(collection(db, 'Productos'), orderBy('Precio', 'desc'), limit(3));
                const querySnapshot = await getDocs(q);
                setDestacados(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setEstado('ok');
            } catch {
                setEstado('error');
            }
        };

        fetchDestacados();
    }, []);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="row align-items-center gy-5">
                        <Revelar className="col-lg-7">
                            <span className="etiqueta-seccion">S.H. Figuarts · Dragon Ball</span>
                            <h1 className="hero-titulo">{texto}</h1>
                            <p className="hero-texto">
                                Figuras articuladas de tus personajes favoritos de Dragon Ball, listas para tu colección.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Link to="/productos" className="btn btn-primary btn-lg">Ver productos</Link>
                                <a href="#bandos" className="btn btn-outline-primary btn-lg">Elegí tu bando</a>
                            </div>
                        </Revelar>
                        <Revelar className="col-lg-5" retraso={150}>
                            <div className="hero-imagen">
                                <img src="/Images/GokuSHFiguart.jpg" alt="Figura S.H. Figuarts de Son Goku" />
                            </div>
                        </Revelar>
                    </div>
                </div>
            </section>

            <section className="seccion" aria-labelledby="titulo-destacados">
                <div className="container">
                    <Revelar className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                        <div>
                            <span className="etiqueta-seccion">Lo más buscado</span>
                            <h2 id="titulo-destacados" className="titulo-seccion mb-0">Destacados</h2>
                        </div>
                        <Link to="/productos" className="btn btn-outline-primary">Ver todos los productos</Link>
                    </Revelar>
                    {estado === 'ok' ? (
                        <div className="row">
                            {destacados.map((producto, indice) => (
                                <Item key={producto.id} producto={producto} indice={indice} nivelTitulo="h3" />
                            ))}
                        </div>
                    ) : (
                        <p aria-busy={estado === 'cargando'}>
                            {estado === 'cargando' ? 'Cargando destacados...' : 'No pudimos cargar los destacados. Probá entrando a Productos.'}
                        </p>
                    )}
                </div>
            </section>

            <section id="bandos" className="seccion seccion-teal" aria-labelledby="titulo-bandos">
                <div className="container">
                    <Revelar className="mb-4">
                        <span className="etiqueta-seccion">Categorías</span>
                        <h2 id="titulo-bandos" className="titulo-seccion mb-0">Elegí tu bando</h2>
                    </Revelar>
                    <div className="row g-4">
                        {BANDOS.map((bando, indice) => (
                            <Revelar key={bando.categoria} className="col-md-6" retraso={indice * 150}>
                                <div className="tarjeta-bando">
                                    <img src={bando.imagen} alt="" />
                                    <div>
                                        <h3>{bando.nombre}</h3>
                                        <p>{bando.texto}</p>
                                        <Link to={`/productos/categoria/${bando.categoria}`} className="btn btn-primary">
                                            Ver {bando.nombre.toLowerCase()}
                                        </Link>
                                    </div>
                                </div>
                            </Revelar>
                        ))}
                    </div>
                </div>
            </section>

            <Revelar>
                <Novedades />
            </Revelar>
        </>
    );
}


export default Bienvenida
