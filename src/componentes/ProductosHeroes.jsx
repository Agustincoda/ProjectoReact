function MostrarProductosHeroes() {
    const FigurasHeroes = [
        { id: 1, name: "Son Goku", description: "Goku, el legendario luchador de la tierra. Vive para entrenar y encontrar un nuevo nivel de poder", precio: 10000, imagen: "Images/GokuSHFiguart.jpg", stock: 10 },
        { id: 13, name: "SSJ2 Gohan", description: "Con su furia desatada Gohan liberó todo su potencial y alcanzó una forma que ni Goku pudo llegar", precio: 15000, imagen: "Images/SSJ2GohanSHFiguart.jpg", stock: 4 },
        { id: 27, name: "Orange Piccolo", description: "Gracias a la ayuda de Shenlong Piccolo ascendió a otro nivel y puede detener a los gammas con su nueva transformación", precio: 20000, imagen: "Images/OrangePiccoloSHFiguart.jpg", stock: 6 }
    ];
    
    return (
        <div className="container">
            <div className="row">
                {FigurasHeroes.map(figura => (
                    <div key={figura.id} className="col-md-4">
                        <div className="card border-dark mb-4" style={{ width: '18rem', margin: 'auto' }}>
                            <img src={figura.imagen} className="card-img-top" alt={figura.name} />
                            <div className="card-body text-center">
                                <p className="card-title font-weight-bold">{figura.name}</p>
                                <p className="card-text">{figura.description}</p>
                                <p className="card-text">Stock: {figura.stock}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostrarProductosHeroes;
