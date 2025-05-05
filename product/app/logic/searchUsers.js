import { data } from '../data/index.js'

export const searchUsers = (query) => {
    const token = data.token

    return fetch(`http://localhost:8080/users/search?query=${query}`, {
        method: 'GET',
        headers: {
            Authorization : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json()) // Parseamos la respuesta como JSON
        .then((foundUsers) => {
            if (!Array.isArray(foundUsers)) {
                throw new Error('Unexpected response format')
            }
            return foundUsers // Devolvemos los usuarios encontrados
        })
        .catch((error) => {
            console.error('Error fetching users:', error)
            throw error // Lanza el error si hay algún problema
        })
}

/*
searchUsers(query): Esta función hace una solicitud GET al endpoint /api/users/search?query=${query} del backend.
 Recibe el query como argumento, lo pasa como parámetro en la URL, y devuelve los usuarios encontrados.

Manejo de Errores: Si la respuesta no es un array o si ocurre un error durante la solicitud, lanzamos un error para manejarlo en el componente
*/