import './App.css';
import NavBar from './componentes/NavBar';

function App() {
    return (
        <>
            <NavBar />
            <div className="content">
                <h1>Welcome to the ultimate Dragonball Store!</h1>
                <p style={{ color: "orange" }}>Goku!</p>
                <img src='../public/gokuSHFiguart.jpg' alt='Goku' />
            </div>
        </>
    );
}

export default App;
