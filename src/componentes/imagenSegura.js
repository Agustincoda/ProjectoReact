const IMAGEN_POR_DEFECTO = '/Images/imagenError.jpg';

// Las rutas de imagen vienen de Firestore: solo se aceptan rutas propias o https (nada de javascript:, data:, etc.)
const imagenSegura = (url) => {
    if (typeof url !== 'string') return IMAGEN_POR_DEFECTO;
    if (url.startsWith('/') && !url.startsWith('//')) return url;
    if (url.startsWith('https://')) return url;
    return IMAGEN_POR_DEFECTO;
};

export default imagenSegura;
