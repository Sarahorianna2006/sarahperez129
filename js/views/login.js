import { fetchData } from "../api.js";
import { saveUserToStorage } from "../auth.js";

export default function Login() {
    document.getElementById('app').innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
        <input type="email" name="email" placeholder="Correo" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button class="log-in_register">Log in</button>
    </form>
    <p> ¿No tienes cuenta? <a class="link-registro" href="#/register">Registrate aquí</a></p>
    `;

    //funsion para login
    document.getElementById('loginForm').addEventListener('submit', async e =>{
        e.preventDefault();
        try {
            const form = new FormData(e.target);
            const email = form.get('email');
            const password = form.get('password');

            const usuarios = await fetchData(`usuarios?email=${email}`);
            const usuario = usuarios.find(u => u.password === password);

            //Funcion de si usuario y contraseña no son igual a las que registraste
            if (usuario) {
                saveUserToStorage(usuario);
                location.hash = '#/dashboard';
            } else {
                alert('Credenciales invalidas');
            }
        }catch (error) {
            console.error('Error al iniciar sesion: ', error);
            alert('No se pudo iniciar sesion');
        }
    });
}