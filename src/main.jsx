import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import CartProvider from './componentes/CartContext';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFixvHWAlPExKmDR8pRo_TpdMpRG-KDY0",
  authDomain: "e-commerce-db-coderhouse.firebaseapp.com",
  projectId: "e-commerce-db-coderhouse",
  storageBucket: "e-commerce-db-coderhouse.appspot.com",
  messagingSenderId: "333748779397",
  appId: "1:333748779397:web:5caaeec8a13ee344d92cec"
};


initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>,
);
