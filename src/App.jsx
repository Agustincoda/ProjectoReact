import './App.css';
import NavBar from './componentes/NavBar';
import Bienvenida from './componentes/Welcome';
import MostrarProductosHeroes from './componentes/ProductosHeroes';
import MostrarProductosVillanos from './componentes/ProductosVillanos';

function App() {
    return (
        <>
            <NavBar />
            <Bienvenida texto="Welcome to the ultimate Dragon ball Store!" />
            <MostrarProductosHeroes />
            <MostrarProductosVillanos/>
            <footer>
                <h1>En desarrollo</h1>
            </footer>
        </>
    );
}

export default App;
