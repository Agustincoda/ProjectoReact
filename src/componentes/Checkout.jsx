// // src/App.jsx

// import React from 'react';
// import NavBar from './componentes/NavBar';
// import Bienvenida from './componentes/Welcome';
// import MostrarProductos from './componentes/itemList';
// import DetalleProducto from './componentes/itemDetail';
// import Checkout from './componentes/Checkout'; 
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Footer from './componentes/Footer';
// import ErrorUbicacion from './componentes/Error';
// import CartProvider from './componentes/CartContext';
// import Carrito from './componentes/CartWidget';

// function App() {
//     return (
//         <div className="container my-5">
//             <h2>Finalizar Compra</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="nombre" className="form-label">Nombre</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="nombre"
//                         name="nombre"
//                         value={formData.nombre}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="direccion" className="form-label">Dirección</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="direccion"
//                         name="direccion"
//                         value={formData.direccion}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="tarjeta" className="form-label">Número de Tarjeta</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="tarjeta"
//                         name="tarjeta"
//                         value={formData.tarjeta}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Finalizar Compra</button>
//             </form>
//         </div>
//     );
// };

// export default Checkout;
