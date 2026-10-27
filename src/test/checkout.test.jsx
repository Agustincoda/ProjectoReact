import { useContext, useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { axe } from 'jest-axe';
import CartProvider, { CartContext } from '../componentes/CartContext';
import Checkout from '../componentes/Checkout';

// Firestore y SweetAlert2 simulados: los tests no tocan la base real
const firestore = vi.hoisted(() => ({
    getDoc: vi.fn(),
    addDoc: vi.fn(),
    commit: vi.fn(),
    update: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
    getFirestore: () => ({}),
    doc: (db, coleccion, id) => ({ coleccion, id }),
    getDoc: firestore.getDoc,
    writeBatch: () => ({ update: firestore.update, commit: firestore.commit }),
    increment: (n) => ({ increment: n }),
    collection: (db, nombre) => ({ nombre }),
    addDoc: firestore.addDoc,
}));

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn(() => Promise.resolve({ isConfirmed: true })) } }));

const producto = { id: 'cell', Nombre: 'Perfect Cell', Precio: 16000, Stock: 5, Imagen: '/Images/PerfectcellSHFiguart.jpg' };

// Carga el carrito antes de mostrar el checkout
const ConProducto = ({ children }) => {
    const { addItem, cart } = useContext(CartContext);
    useEffect(() => {
        if (cart.length === 0) addItem(producto, 2);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return children;
};

const renderCheckout = ({ conProducto = true } = {}) => render(
    <CartProvider>
        <MemoryRouter initialEntries={['/checkout']}>
            <main>
                <Routes>
                    <Route path="/checkout" element={conProducto ? <ConProducto><Checkout /></ConProducto> : <Checkout />} />
                    <Route path="/productos" element={<h1>Productos</h1>} />
                </Routes>
            </main>
        </MemoryRouter>
    </CartProvider>,
);

const completarFormulario = async () => {
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana Prueba');
    await userEvent.type(screen.getByLabelText('Teléfono'), '1122334455');
    await userEvent.type(screen.getByLabelText('Email'), 'ana@ejemplo.com');
};

describe('Checkout', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        firestore.commit.mockResolvedValue();
        firestore.addDoc.mockResolvedValue({ id: 'orden-1' });
    });

    it('con el carrito vacío muestra un aviso en vez del formulario', () => {
        renderCheckout({ conProducto: false });
        expect(screen.getByRole('heading', { level: 1, name: 'Confirmar Compra' })).toBeInTheDocument();
        expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Confirmar Compra' })).not.toBeInTheDocument();
    });

    it('tiene campos con label y autocomplete, sin violaciones de accesibilidad', async () => {
        const { container } = renderCheckout();
        expect(screen.getByLabelText('Nombre')).toHaveAttribute('autocomplete', 'name');
        expect(screen.getByLabelText('Teléfono')).toHaveAttribute('type', 'tel');
        expect(screen.getByLabelText('Email')).toHaveAttribute('autocomplete', 'email');
        expect(await axe(container)).toHaveNoViolations();
    });

    it('no envía nada si faltan datos', async () => {
        renderCheckout();
        await userEvent.click(screen.getByRole('button', { name: 'Confirmar Compra' }));
        expect(firestore.getDoc).not.toHaveBeenCalled();
    });

    it('guarda la orden con el precio de Firestore, no el del carrito', async () => {
        firestore.getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({ Nombre: 'Perfect Cell', Precio: 17000, Stock: 5 }),
        });
        renderCheckout();
        await completarFormulario();
        await userEvent.click(screen.getByRole('button', { name: 'Confirmar Compra' }));

        await waitFor(() => expect(firestore.addDoc).toHaveBeenCalledTimes(1));
        const orden = firestore.addDoc.mock.calls[0][1];
        expect(orden.items).toEqual([{ id: 'cell', title: 'Perfect Cell', price: 17000, quantity: 2 }]);
        expect(orden.total).toBe(34000);
        expect(firestore.update).toHaveBeenCalledWith({ coleccion: 'Productos', id: 'cell' }, { Stock: { increment: -2 } });
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument());
    });

    it('no confirma si no hay stock suficiente', async () => {
        firestore.getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({ Nombre: 'Perfect Cell', Precio: 16000, Stock: 1 }),
        });
        renderCheckout();
        await completarFormulario();
        await userEvent.click(screen.getByRole('button', { name: 'Confirmar Compra' }));

        await waitFor(() => expect(firestore.getDoc).toHaveBeenCalled());
        expect(firestore.commit).not.toHaveBeenCalled();
        expect(firestore.addDoc).not.toHaveBeenCalled();
        expect(screen.getByRole('button', { name: 'Confirmar Compra' })).toBeEnabled();
    });
});
