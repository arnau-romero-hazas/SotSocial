import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { jsonBodyParser,  withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js';

const { JWT_SECRET } = process.env

export const users = Router()

// Endpoint para registrar usuarios
users.post('/', jsonBodyParser, withErrorHandling((req,res) => {
    const { name, email, username, password } = req.body

    return logic.registerUser(name, email, username, password)
        .then(() => res.status(201).send()) // Devuelve un código 201 (creado) si todo va bien
}))

// Endpoint para autenticar usuarios
users.post('/auth', jsonBodyParser, withErrorHandling((req, res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' }) // Generar un JWT con el ID del usuario que expirara en 1 hora

            res.json({ token })
        })
}))

// Endpoint para obtener el nombre del usuario autenticado
users.get('/self/username',authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserUsername(userId)
        .then(username => res.json({ username }))
}))

// Endpoint para obtener los psots
users.get('/:targetUserId/posts', authHandler, withErrorHandling((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getUserPosts(userId, targetUserId)
        .then(posts => res.json(posts))
}))

// Endpoint para buscar usuarios por nombre de usuario
users.get('/search', authHandler, withErrorHandling((req, res) => {
    const { query } = req.query; // Obtenemos el parámetro 'query' desde la query string

    // Validamos que se haya recibido el 'query'
    if (!query) {
        return res.status(400).json({ error: 'Query string is required' });
    }

    return logic.searchUsers(query)
        .then(users => res.json(users)) // Respondemos con la lista de usuarios que coinciden
        .catch(error => res.status(500).json({ error: error.message }));
}));

// Endpoint para resolver usuario por su nombre de usuario
users.get('/resolve', authHandler, withErrorHandling((req, res) => {
    const { username } = req.query;

    // Validamos que se pase el 'username'
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    // Llamamos a la lógica que busca el usuario por su 'username'
    return logic.getUserIdByUsername(username)
        .then(userId => {
            // Si se encuentra el usuario, devolvemos el ID
            return res.json({ id: userId });
        })
        .catch(error => {
            // Manejo de errores si el usuario no se encuentra o hay otro fallo
            if (error.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            }

            // Si hay otro tipo de error, devolvemos un error genérico
            return res.status(500).json({ error: 'Internal Server Error' });
        });
}));
