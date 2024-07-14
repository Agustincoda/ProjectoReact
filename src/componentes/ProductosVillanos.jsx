function MostrarProductosVillanos() {
    const FigurasVillanos = [
        { id: 5, name: "Freezer Forma Final", description: "EL villano más peligroso de Dragon ball", precio: 13000, imagen: "Images/FinalFormSHFiguart.jpg", stock: 1 },
        { id: 12, name: "Cell Perfecto", description: "La forma de vida perfecta", precio: 16000, imagen: "Images/PerfectcellSHFiguart.jpg", stock: 7 },
        { id: 23, name: "SSJ Rose Goku Black", description: "La furia de los dioses con el poder de Goku", precio: 28000, imagen: "Images/SSJRoseSHFiguart.jpg", stock: 0 }
    ];

    return (
        <div className="container">
            <div className="row">
                {FigurasVillanos.map(figura => (
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

export default MostrarProductosVillanos;
