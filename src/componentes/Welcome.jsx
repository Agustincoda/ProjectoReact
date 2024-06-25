function Bienvenida({texto, imagen}) {

    return (
        <div className="content">
            <h1 className="mb-0 color-titulos">{texto}</h1>
            <img src={imagen} alt='Goku' />
        </div>

    );
};


export default Bienvenida