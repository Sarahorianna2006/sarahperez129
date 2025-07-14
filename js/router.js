import Login from './views/login.js';
import Register from './views/register.js';
import Dashboard from './views/dashboard.js';
import NotFound from './views/not-found.js';
import CreateEvent from './views/create-events.js';
import EditEvent from './views/edit-events.js';
import { getUserFromStorage } from './auth.js';

const routes = {
    '/': Login,
    '/login': Login,
    '/register': Register,
    '/dashboard': Dashboard,
    '/dashboard/events/create': CreateEvent,
    '/dashboard/events/edit': EditEvent,
    '/not-found': NotFound,
};

export function router (){
    const hash = location.hash.slice(1) || '/';

    //eliminar parametro como ?id=1
    const path = hash.split('?')[0];

    const view = routes[path] || NotFound;
    const user = getUserFromStorage();

    const isPrivate = path.startsWith('/dashboard');

    if (isPrivate && !user) {
        location.hash = '#/not-found';
        return;
    }

    if ((path === '/login' || path === '/register') && user) {
        location.hash = '#/dashboard';
        return;
    }
    view();
}