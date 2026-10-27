import usePagina from './usePagina';

function Bienvenida({texto}) {
    usePagina('Inicio');

    return (
        <div className="content">
            <h1 className="mb-0 color-titulos">{texto}</h1>
           
        </div>

    );
}


export default Bienvenida