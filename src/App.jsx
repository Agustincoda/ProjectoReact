import './App.css';
import NavBar from './componentes/NavBar';
import Bienvenida from './componentes/Welcome';
import MostrarProductos from './componentes/Productos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div id="root">
            <BrowserRouter>
                <NavBar />
                <div className="app-container">
                    <Routes>
                        <Route exact path='/' element={<Bienvenida texto="Welcome to the ultimate Dragon ball Store!" />} />
                        <Route exact path='/productos' element={<MostrarProductos />} />
                        <Route exact path='/productos/categoria/:categoria' element={<MostrarProductos />} />
                        <Route exact path='/productos/:id' element={<MostrarProductos />} />
                    </Routes>
                </div>
                <footer>
                    <h1>En desarrollo</h1>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
