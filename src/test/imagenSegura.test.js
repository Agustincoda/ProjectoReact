import { describe, expect, it } from 'vitest';
import imagenSegura from '../componentes/imagenSegura';

describe('imagenSegura', () => {
    it('acepta rutas propias y https', () => {
        expect(imagenSegura('/Images/GokuSHFiguart.jpg')).toBe('/Images/GokuSHFiguart.jpg');
        expect(imagenSegura('https://ejemplo.com/a.jpg')).toBe('https://ejemplo.com/a.jpg');
    });

    it('reemplaza esquemas peligrosos o valores inválidos', () => {
        for (const url of ['javascript:alert(1)', 'data:text/html,hola', '//otro-sitio.com/a.jpg', 'http://ejemplo.com/a.jpg', undefined, 42]) {
            expect(imagenSegura(url)).toBe('/Images/imagenError.jpg');
        }
    });
});
