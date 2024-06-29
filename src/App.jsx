import './App.css';
import NavBar from './componentes/NavBar';
import Bienvenida from './componentes/Welcome'

function App() {
    return (
        <>
            <NavBar />
            <Bienvenida texto="Welcome to the ultimate Dragon ball Store!"  imagen="Images/gokuSHFiguart.jpg"/>
            <footer>
                <h1>En desarrollo</h1>
            </footer>
        </>
    );
}

export default App;
