import { fetchData } from "../api.js";

export default async function EditEvent () {
    const params = new URLSearchParams(location.hash.split('?') [1]);
    const id = params.get('id');

    const event = await fetchData (`events/${id}`);

    document.getElementById('app').innerHTML = `
        <h2>Editar evento</h2>
        <form id="editEventForm">
            <input type="text" name="titulo" placeholder="Titulo" values="${event.titulo}" required/>
            <input type="text" name="autor" placeholder="Autor" values="${event.autor}" required/>
            <label>
                <input type="checkbox" name="disponible" ${event.disponible ? 'checked' : ''} />
                Disponible
            </label>
            <button>Guardar cambios</button>
        </form>
        <a href="#/dashboard">Volver</a>
    `;
    document.getElementById('editEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        await fetchData(`events/${id}`, 'PATCH', {
            titulo: form.get('titulo'),
            autor: form.get('autor'),
            disponible: form.get('disponible') === 'on'
        });
        
        alert("Evento actualizado correctamente");
        location.hash = '#/dashboard';
    });
}