// Importamos la configuración de variables de entorno desde un archivo .env
import 'dotenv/config';

// Importamos Express y la función json para procesar cuerpos de solicitud en formato JSON
import express, { json } from 'express';

// Importamos CORS para permitir solicitudes desde diferentes dominios
import cors from 'cors';

// Importamos el módulo de manejo de errores (parece que "com" no es un módulo válido, ¿quizás es un error tipográfico?)
import { errors } from 'com';

// Importamos jsonwebtoken para manejar la autenticación mediante JWT
import jwt from 'jsonwebtoken';

// Importamos módulos locales para gestionar la base de datos y la lógica de negocio
import { data } from './data/index.js';
import { logic } from './logic/index.js';
import { syncIndexes } from 'mongoose';

// Extraemos clases de error personalizadas desde el módulo de errores
const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors;

// Extraemos las variables de entorno definidas en el archivo .env
const { JWT_SECRET, PORT, MONGO_URL, MONGO_DB } = process.env;

// Función wrapper para manejar errores en funciones asíncronas de Express
const withErrorHandling = callback => {
    return (req, res, next) => {
        try{
            callback(req, res)
                .catch(error => next(error));
        }catch(error){
            next(error)
        }
    }
}

// Conectamos a la base de datos usando las variables de entorno
data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error) // Si hay un error al conectar, lo mostramos en consola
    .then(() => {
        // Inicializamos la aplicación EXPRESS
        const api = express()

        // Middleware para procesar cuerpos JSON en las solicitudes
        const jsonBodyParser = json()

        // Activamos CORS en nuestra API
        api.use(cors())

        // Ruta de prueba para verificar que la API está en funcionamiento
        api.get('/', (req, res) => res.send('Hello, API!'))

        // Endpoint para registrar usuarios
        api.post('/users', jsonBodyParser, withErrorHandling((req,res) => {
            const { name, email, username, password } = req.body
            return logic.registerUser(name, email, username, password)
                .then(() => res.status(201).send()) // Devuelve un código 201 (creado) si todo va bien
        }))

        // Endpoint para autenticar usuarios
        api.post('/users/auth', jsonBodyParser, withErrorHandling((req, res) => {
            const { username, password } = req.body
            return logic.authenticateUser(username, password)
                .then(id => {
                    const token = jwt.sign({ sub: id }, JWT_SECRET) // Generar un JWT con el ID del usuario
                })
        }))

        // Endpoint para obtener el nombre del usuario autenticado
        api.get('/user/self/name', withErrorHandling((req, res) => {
            const { authorization } = req.headers
            const token = authorization.slice(7) // Extraemos el token quitando "Bearer "
            const { sub: userId } = jwt.verify(token, JWT_SECRET) // Verificamos el token y extraemos el userId
            return logic.getUserName(userId)
                .then(name => res.json({ name }))
        }))

        // Endpoint para crear un post
        
        api.post('/posts', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers
            const token = authorization.slice(7)
            const { sub: userId} = jwt.verify(token, JWT_SECRET)
            const { image, text} = req.body
            return logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
        }))

        // Endpoint para obtener los post del usuario autenticado
        api.get('/posts', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers
            const token = authorization.slice(7)
            const { sub: userId} = jwt.verify(token, JWT_SECRET)
            return logic.getPosts(userId)
                .then(posts => res.json(posts))
        }))

        // Endpoint para eliminar un post
        api.delete('/posts/:postId', withErrorHandling((req, res) => {
            const { authorization } = req.headers
            const token = authorization.slice(7)
            const { sub: userId } = jwt.verify(token, JWT_SECRET)
            const { postId } = req.params
            return logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        // Endpoint para dar o quitar like a un post
        api.patch('/posts/:postId/text', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers
            const token = authorization.slice(7)
            const { sub: userId } = jwt.verify(token, JWT_SECRET)
            const { postId } = req.params
            const { text } = req.body
            return logic.updatePostText(userId, postId, text)
                .then(() => res.status(204).send())
        }))

        // Middleware para manejar errores
        const errorHandler = (error, req, res, next) => {
            console.error(error)
            let status = 500
            let errorName = SystemError.name
            if (error instanceof DuplicityError) {
                status = 409;
                errorName = error.constructor.name;
            } else if (error instanceof ValidationError) {
                status = 400;
                errorName = error.constructor.name;
            } else if (error instanceof CredentialsError) {
                status = 401;
                errorName = error.constructor.name;
            } else if (error instanceof NotFoundError) {
                status = 404;
                errorName = error.constructor.name;
            } else if (error instanceof OwnershipError) {
                status = 403;
                errorName = error.constructor.name;
            }
            res.status(status).json({ error: errorName, message: error.message });
        }

        // Registramos el middleware de manejo de rrores
        api.use(errorHandler)

        // Ponemos a escuchar el servidor en el puerto especificado en las variables de entorno
        api.listen(PORT, () => console.log(`API running on port ${PORT}`))

    })