import { Link } from 'react-router-dom';
import usePagina from './usePagina';

function ErrorUbicacion(){
    usePagina('Página no encontrada');


    return(
        <>
        <div className="error container">
        <h1 className="display-4">Esta página no existe</h1>
        <p className="fs-5">Parece que este rincón del universo todavía no fue descubierto.</p>
        <img src="/Images/imagenError.jpg" alt="Página no encontrada" className="img-fluid rounded-4 my-3" style={{ maxWidth: '480px' }}/>
        <div>
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
        </div>
        </>
    );


}

export default ErrorUbicacion;
