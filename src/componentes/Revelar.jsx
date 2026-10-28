import { useEffect, useRef, useState } from 'react';

// Muestra el contenido con un fade al entrar en pantalla.
// Sin animación si el navegador no soporta IntersectionObserver o el sistema pide movimiento reducido.
const Revelar = ({ children, as: Etiqueta = 'div', retraso = 0, className = '' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const elemento = ref.current;
        if (!elemento) return;

        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }

        const observador = new IntersectionObserver(([entrada]) => {
            if (entrada.isIntersecting) {
                setVisible(true);
                observador.disconnect();
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        observador.observe(elemento);
        return () => observador.disconnect();
    }, []);

    return (
        <Etiqueta
            ref={ref}
            className={`revelar ${visible ? 'revelado' : ''} ${className}`}
            style={{ transitionDelay: `${retraso}ms` }}
        >
            {children}
        </Etiqueta>
    );
};

export default Revelar;
