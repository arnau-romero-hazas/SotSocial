// logic/index.js
import { data } from '../data/index.js'

export const getUserIdByUsername = (username) => {
    const token = data.token;

    return fetch(`http://localhost:8080/users/resolve?username=${encodeURIComponent(username)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            if (!res.ok) {
                console.error('Respuesta no OK:', res.status, res.statusText);
                throw new Error('Usuario no encontrado');
            }
            return res.json();
        })
        .then(user => {
            console.log('Usuario encontrado:', user);
            return user.id;
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            throw error;
        });
};