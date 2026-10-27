import { useEffect } from 'react';

// Actualiza el <title> y lleva el foco al <h1> para que los lectores de pantalla anuncien el cambio de página
const usePagina = (titulo) => {
    useEffect(() => {
        document.title = `${titulo} | Dragon Store`;
        const h1 = document.querySelector('main h1');
        if (h1) {
            h1.setAttribute('tabindex', '-1');
            h1.focus({ preventScroll: true });
        }
    }, [titulo]);
};

export default usePagina;
