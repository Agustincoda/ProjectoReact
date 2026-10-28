import { useState } from 'react';

// Registro a novedades con Netlify Forms: los emails quedan en el panel de Netlify del sitio.
// El formulario estático "novedades" de index.html es el que Netlify detecta al deployar.
const Novedades = () => {
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('inicial');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (estado === 'enviando') return;
        setEstado('enviando');

        try {
            const datos = new URLSearchParams({
                'form-name': 'novedades',
                email,
                'bot-field': e.target.elements['bot-field'].value,
            });
            const respuesta = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: datos.toString(),
            });
            if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
            setEmail('');
            setEstado('ok');
        } catch {
            setEstado('error');
        }
    };

    return (
        <section className="seccion novedades" aria-labelledby="titulo-novedades">
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-6">
                        <span className="etiqueta-seccion">Novedades</span>
                        <h2 id="titulo-novedades" className="titulo-seccion">Mantenete al día</h2>
                        <p className="fs-5 mb-0">Registrate para enterarte primero de las figuras nuevas y de cuándo vuelve el stock.</p>
                    </div>
                    <div className="col-lg-6">
                        <form name="novedades" onSubmit={handleSubmit}>
                            {/* Campo trampa para bots: las personas no lo ven */}
                            <p className="visually-hidden" aria-hidden="true">
                                <label>No completar <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                            </p>
                            <label htmlFor="email-novedades" className="form-label fw-semibold">Tu email</label>
                            <div className="d-flex flex-wrap gap-2">
                                <input
                                    type="email"
                                    className="form-control form-control-lg flex-grow-1 w-auto"
                                    id="email-novedades"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-describedby="aviso-novedades"
                                    required
                                />
                                <button type="submit" className="btn btn-primary btn-lg" disabled={estado === 'enviando'}>
                                    {estado === 'enviando' ? 'Enviando...' : 'Registrarme'}
                                </button>
                            </div>
                            <p id="aviso-novedades" className="texto-suave small mt-2 mb-0">
                                Solo te escribimos con novedades de la tienda. Podés darte de baja cuando quieras.
                            </p>
                            <p role="status" className="fw-semibold mt-3 mb-0">
                                {estado === 'ok' && '¡Listo! Te vamos a avisar de las novedades.'}
                                {estado === 'error' && 'No pudimos registrarte. Intentá de nuevo en un rato.'}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Novedades;
