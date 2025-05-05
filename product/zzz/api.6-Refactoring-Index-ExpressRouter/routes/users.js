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
users.get('/self/name',authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUserName(userId)
        .then(name => res.json({ name }))
}))