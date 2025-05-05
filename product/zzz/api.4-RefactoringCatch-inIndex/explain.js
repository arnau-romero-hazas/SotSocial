// Importamos las dependencias necesarias
import express, { json } from 'express' // Express para manejar rutas y json para procesar JSON en las peticiones
import cors from 'cors' // Middleware para permitir solicitudes desde otros orígenes (Cross-Origin Resource Sharing)
import { errors } from 'com' // Importamos errores personalizados desde un módulo (parece que hay un error tipográfico en 'com')
import jwt from 'jsonwebtoken' // Librería para manejar tokens JWT

// Importamos módulos personalizados
import { data } from './data/index.js' // Módulo de conexión con la base de datos
import { logic } from './logic/index.js' // Módulo con la lógica de negocio

// Desestructuramos los tipos de errores personalizados del módulo 'errors'
const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors

// Definimos una clave secreta para firmar los tokens JWT
const JWT_SECRET = 'mi numero favorito es el 17' // ⚠️ No es seguro poner la clave en el código, mejor usar variables de entorno

// Función para manejar errores en los endpoints de manera centralizada
const handleWithErrorHandling = (next, callback) => {
    try {
        callback() // Ejecutamos la función asincrónica
            .catch(error => { // Si hay un error en la promesa, lo capturamos
                console.error(error) // Lo mostramos en consola
                next(error) // Pasamos el error al middleware de manejo de errores
            })
    } catch (error) { // Si hay un error en el try, lo capturamos aquí
        console.error(error)
        next(error) // Pasamos el error al middleware de manejo de errores
    }
}

// Conectamos con la base de datos MongoDB
data.connect('mongodb://localhost:27017', 'test') // URL local de MongoDB y nombre de la base de datos
    .catch(console.error) // Captura errores en la conexión
    .then(() => { // Si la conexión es exitosa, arrancamos la API
        const api = express() // Creamos la instancia de Express

        const jsonBodyParser = json() // Middleware para procesar JSON en el body de las peticiones

        api.use(cors()) // Permitimos solicitudes desde otros dominios

        // Endpoint de prueba para verificar que la API funciona
        api.get('/', (req, res) => res.send('Hello, API!'))

        // Endpoint para registrar un usuario
        api.post('/users', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { name, email, username, password } = req.body // Extraemos datos del body

                return logic.registerUser(name, email, username, password) // Llamamos a la lógica de registro
                    .then(() => res.status(201).send()) // Si todo va bien, devolvemos código 201 (creado)
            })
        })

        // Endpoint para autenticar usuario y generar un token JWT
        api.post('/users/auth', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { username, password } = req.body

                return logic.authenticateUser(username, password) // Verificamos credenciales
                    .then(id => {
                        const token = jwt.sign({ sub: id }, JWT_SECRET) // Firmamos un token con el ID del usuario
                        res.json({ token }) // Enviamos el token al cliente
                    })
            })
        })

        // Endpoint para obtener el nombre del usuario autenticado
        api.get('/users/self/name', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers // Obtenemos la cabecera de autorización

                const token = authorization.slice(7) // Quitamos 'Bearer ' del token

                const { sub: userId } = jwt.verify(token, JWT_SECRET) // Verificamos el token y extraemos el ID del usuario

                return logic.getUserName(userId) // Obtenemos el nombre del usuario
                    .then(name => res.json({ name })) // Devolvemos el nombre
            })
        })

        // Endpoint para crear un post
        api.post('/posts', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { image, text } = req.body

                return logic.createPost(userId, image, text) // Guardamos el post en la base de datos
                    .then(() => res.status(201).send()) // Confirmamos con 201 (creado)
            })
        })

        // Endpoint para obtener los posts del usuario autenticado
        api.get('/posts', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                return logic.getPosts(userId) // Obtenemos los posts del usuario
                    .then(posts => res.json(posts)) // Enviamos los posts como respuesta
            })
        })

        // Endpoint para eliminar un post
        api.delete('/posts/:postId', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                return logic.deletePost(userId, postId) // Eliminamos el post
                    .then(() => res.status(204).send()) // Enviamos una respuesta sin contenido
            })
        })

        // Endpoint para dar like a un post
        api.patch('/posts/:postId/likes', (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params

                return logic.toggleLikePost(userId, postId) // Alternamos el like del post
                    .then(() => res.status(204).send())
            })
        })

        // Endpoint para actualizar el texto de un post
        api.patch('/posts/:postId/text', jsonBodyParser, (req, res, next) => {
            handleWithErrorHandling(next, () => {
                const { authorization } = req.headers

                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { postId } = req.params
                const { text } = req.body

                return logic.updatePostText(userId, postId, text) // Actualizamos el texto del post
                    .then(() => res.status(204).send())
            })
        })

        // Middleware para manejar errores
        const errorHandler = (error, req, res, next) => {
            let status = 500
            let errorName = SystemError.name

            if (error instanceof DuplicityError) status = 409
            else if (error instanceof ValidationError) status = 400
            else if (error instanceof CredentialsError) status = 401
            else if (error instanceof NotFoundError) status = 404
            else if (error instanceof OwnershipError) status = 403

            res.status(status).json({ error: error.constructor.name, message: error.message }) // Enviamos la respuesta con el error
        }

        api.use(errorHandler) // Usamos el middleware de manejo de errores

        // Iniciamos el servidor en el puerto 8080
        api.listen(8080, () => console.log('API running on port 8080'))
    })
