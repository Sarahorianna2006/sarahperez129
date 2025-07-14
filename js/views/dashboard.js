import { getUserFromStorage, clearUserFromStorage } from "../auth.js";
import { fetchData } from "../api.js";

export default async function Dashboard() {
    try{
        const user = getUserFromStorage();
        if (!user){
            location.hash = '#/login';
            return;
        }

        let content = `<h2>Bienvenido, ${user.nombre} (${user.rol})</h2>
        <button id="logout">Logout</button>`;

        //si es admin, muestra los botones para crear y ver eventos
        if(user.rol === 'Admin') {
            content += `
            <button id="agregarEventoBtn">ADD NEW EVENT</button><br><br>
            <button id="verEventosBtn">Events</button>
            <div id="eventsContainer"></div>
            `;
        } else {
            const events = await fetchData('events');
            content +=`
            <h3>Catalogo de eventos</h3>
            <ul>
                ${events.map(event => `
                    <li>
                        <strong>${event.titulo}</strong> - ${event.autor}
                        ${event.disponible
                        ? `<button type="button" data-id="${event.id}" class="enroll-btn">enroll</button>`
                        : `<span>sold out</span>`}
                    </li>
               `).join('')}
            </ul>
            `;
        }

        document.getElementById('app').innerHTML = content;

        //boton para cerrar sesion
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () =>{
                clearUserFromStorage();
                location.hash = '#/login';
            });
        }

        //boton para agregar evento
        const agregarEventBtn = document.getElementById('agregarEventBtn');
        if (agregarEventBtn) {
            agregarEventBtn.addEventListener('click', () => {
                location.hash = '#/dashboard/events/create';
            });
        }

        //funcionalidad de ver eventos solo para admin
        const verEventsBtn = document.getElementById('verEventsBtn');
        if (verEventsBtn) {
            verEventsBtn.addEventListener('click', async () => {
                const events = await fetchData('events');
                const eventsHTML = events.map(event =>`
                    <li>
                        <div class="buttons-eliminar-editar">
                            <strong>${event.titulo}</strong> - ${event.autor}
                            (${event.disponible ? 'Disponible' : 'No disponible'})
                            <div class="editar-eliminar">
                                <button class="editar-btn" data-id="${event.id}">Editar</button>
                                <button class="eliminar-btn" data-id="${event.id}">Eliminar</button>
                            </div>
                        </div>
                    </li>
                `).join('');
                document.getElementById('eventsContainer').innerHTML = `
                <h3>Eventos disponibles</h3>
                <ul>${eventsHTML}</ul>
                `;

                //eventos eliminar evento
                document.querySelectorAll('.eliminar-btn').forEach(btn => {
                    btn.addEventListener('click', async () => {
                        const eventId = btn.getAttribute('data-id');
                        const confirmar = confirm("¿Estas seguro de eliminar este evento?");
                        if (confirmar) {
                            try{
                                await fetchData(`events/${eventId}`, 'DELETE');
                                alert("Evento eliminado correctamente");

                                //recargar la lista despues de eliminar
                                btn.closest('li').remove();
                            } catch (error) {
                                console.error("Error al eliminar evento: ", error);
                                alert("No se pudo eliminar evento");
                            }
                        }
                    });
                });

                //funcion de editar evento
                document.querySelectorAll('.editar-btn').forEach(btn =>{
                    btn.addEventListener('click', () =>{
                        const eventId = btn.getAttribute('data-id');
                        location.hash = `#/dashboard/events/edit?id=${eventId}`;
                    });
                });
            });
        }

        //enroll evento (visitante)
        if (user.rol === 'visitante') {
            document.querySelectorAll('.enroll-btn').forEach(btn => {
                btn.addEventListener('click', async (e) =>{
                    e.preventDefault();
                    const eventId = btn.getAttribute('data-id');
                    const confirmando = confirm('¿Deseas inscribirte a este evento?');
                    if (confirmando) {
                        await fetchData('enrolls', 'POST', {
                            usuarioId: user.id,
                            eventId,
                            fecha: new Date().toISOString()
                        });

                        await fetchData (`events/${eventId}`, `PATCH`, {disponible: false});
                        alert('Inscripcion realizada con exito');
                        location.reload();
                    }

                });
            });
        }
    } catch (error) {
        console.error("Error en Dashboard: ", error);
        document.getElementById('app').innerHTML = `<p style="color: red;">No se pudo cargar el dashboard</p>`;
    }
}
