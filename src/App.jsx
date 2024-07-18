import './App.css';
import NavBar from './componentes/NavBar';
import Bienvenida from './componentes/Welcome';
import MostrarProductos from './componentes/Productos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './componentes/Footer';
import ErrorUbicacion from './componentes/Error';

function App() {
    return (
        <div >
            <BrowserRouter>
                <NavBar />
                <div className="app-container">
                    <Routes>
                        <Route exact path='/' element={<Bienvenida texto="Welcome to the ultimate Dragon ball Store!" />} />
                        <Route exact path='/productos' element={<MostrarProductos />} />
                        <Route exact path='/productos/categoria/:categoria' element={<MostrarProductos />} />
                        <Route exact path='/productos/:id' element={<MostrarProductos />} />
                        <Route exact path='*' element={<ErrorUbicacion />} />
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
