import './App.css';
import NavBar from './componentes/NavBar';
import Bienvenida from './componentes/Welcome';
import MostrarProductos from './componentes/itemList';
import DetalleProducto from './componentes/itemDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './componentes/Footer';
import ErrorUbicacion from './componentes/Error';
import CartProvider from './componentes/CartContext';
import Carrito from './componentes/CartWidget';

function App() {
    return (
        <div>
            <CartProvider>
                <BrowserRouter>
                    <NavBar />
                    <div className="app-container">
                        <Routes>
                            <Route exact path='/' element={<Bienvenida texto="Welcome to the ultimate Dragon ball Store!" />} />
                            <Route exact path='/productos' element={<MostrarProductos />} />
                            <Route exact path='/productos/categoria/:categoria' element={<MostrarProductos />} />
                            <Route exact path='/productos/:id' element={<DetalleProducto />} />
                            <Route exact path='/carrito' element={<Carrito />} />
                            <Route exact path='*' element={<ErrorUbicacion />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </div>
    );
}

export default App;
