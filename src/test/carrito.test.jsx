import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import CartProvider, { CartContext } from '../componentes/CartContext';
import Carrito from '../componentes/CartWidget';

const producto = { id: 'cell', Nombre: 'Perfect Cell', Precio: 16000, Stock: 3, Imagen: '/Images/PerfectcellSHFiguart.jpg' };

// Botón de prueba para cargar el carrito desde el contexto
const Agregar = ({ cantidad }) => {
    const { addItem } = useContext(CartContext);
    return <button type="button" onClick={() => addItem(producto, cantidad)}>Agregar {cantidad}</button>;
};

const renderCarrito = () => render(
    <CartProvider>
        <MemoryRouter>
            <Agregar cantidad={2} />
            <main><Carrito /></main>
        </MemoryRouter>
    </CartProvider>,
);

describe('Carrito', () => {
    it('suma cantidades sin pasarse del stock', async () => {
        renderCarrito();
        const boton = screen.getByRole('button', { name: 'Agregar 2' });
        await userEvent.click(boton);
        expect(screen.getByText('Cantidad: 2')).toBeInTheDocument();

        await userEvent.click(boton);
        expect(screen.getByText('Cantidad: 3')).toBeInTheDocument();
        expect(screen.getByText('Total: $48000')).toBeInTheDocument();
    });

    it('permite eliminar un producto con un botón con nombre accesible', async () => {
        renderCarrito();
        await userEvent.click(screen.getByRole('button', { name: 'Agregar 2' }));
        await userEvent.click(screen.getByRole('button', { name: 'Eliminar Perfect Cell del carrito' }));
        expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument();
    });

    it('no tiene violaciones de accesibilidad', async () => {
        const { container } = renderCarrito();
        await userEvent.click(screen.getByRole('button', { name: 'Agregar 2' }));
        expect(await axe(container)).toHaveNoViolations();
    });
});
