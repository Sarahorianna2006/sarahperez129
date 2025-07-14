export default function NoFound(){
    document.getElementById('app').innerHTML = `
    <h2>Error</h2>
    <p>Ruta no encontrada o acceso no autorizado</p>
    <a href="#/login">Ir a login</a>
    `;
}