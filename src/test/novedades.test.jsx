import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Novedades from '../componentes/Novedades';

describe('Novedades', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('envía el email a Netlify Forms y avisa que quedó registrado', async () => {
        const fetchSimulado = vi.fn().mockResolvedValue({ ok: true, status: 200 });
        vi.stubGlobal('fetch', fetchSimulado);
        render(<Novedades />);

        await userEvent.type(screen.getByLabelText('Tu email'), 'ana@ejemplo.com');
        await userEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

        expect(await screen.findByRole('status')).toHaveTextContent('¡Listo!');
        const [url, opciones] = fetchSimulado.mock.calls[0];
        expect(url).toBe('/');
        expect(opciones.method).toBe('POST');
        const datos = new URLSearchParams(opciones.body);
        expect(datos.get('form-name')).toBe('novedades');
        expect(datos.get('email')).toBe('ana@ejemplo.com');
        expect(screen.getByLabelText('Tu email')).toHaveValue('');
    });

    it('muestra un error si el envío falla', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
        render(<Novedades />);

        await userEvent.type(screen.getByLabelText('Tu email'), 'ana@ejemplo.com');
        await userEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

        expect(await screen.findByRole('status')).toHaveTextContent('No pudimos registrarte');
    });

    it('no envía nada sin un email válido', async () => {
        const fetchSimulado = vi.fn();
        vi.stubGlobal('fetch', fetchSimulado);
        render(<Novedades />);

        await userEvent.type(screen.getByLabelText('Tu email'), 'no-es-un-email');
        await userEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

        expect(fetchSimulado).not.toHaveBeenCalled();
    });

    it('no tiene violaciones de accesibilidad', async () => {
        const { container } = render(<Novedades />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
