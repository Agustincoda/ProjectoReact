// 16000 -> "$16.000"
const formatoPrecio = (valor) => `$${Number(valor).toLocaleString('es-AR')}`;

export default formatoPrecio;
