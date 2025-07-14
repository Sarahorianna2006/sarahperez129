import { fetchData  } from "../api.js";

export default function CreateEvent() {
    document.getElementById("app").innerHTML = `
        <h2>ADD NEW EVENT</h2>
        <form id="createEventForm">
            <input type="text" name="titulo" placeholder="Nombre del evento" required />
            <input type="text" name="autor" placeholder="Autor" required />
            <button>Save</button>
        </form>
        <button id="volverBtn">Volver</button>
    `;

    //boton para volver
    const volverBtn = document.getElementById ('volverBtn');
    volverBtn.addEventListener('click', () => {
        location.hash = '#/dashboard';
    });

    //guardar nuevo evento
    document.getElementById("createEventForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const nuevoEvent = {
            titulo: form.get("titulo"),
            autor: form.get("autor"),
            disponible: true
        };

        try{
            await fetchData("events", "POST", nuevoEvent);
            alert("Evento agregado correctamente");
            location.hash = "#/dashboard";
        } catch (error) {
            console.log("Error al agregar evento: ", error);
            alert("No se pudo agregar el evento");
        }
    });
}