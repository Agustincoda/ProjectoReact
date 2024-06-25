import './App.css';
import NavBar from './componentes/NavBar';
import Bienvenida from './componentes/Welcome'

function App() {
    return (
        <>
            <NavBar />
            <Bienvenida texto="Welcome to the ultimate Dragon ball Store!"  imagen="../public/images/gokuSHFiguart.jpg"/>
        </>
    );
}

export default App;
