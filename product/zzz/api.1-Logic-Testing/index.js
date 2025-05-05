import express, { json } from 'express' // Importamos Express y el middleware para parsear el cuerpo en formato JSON

import { logic } from './logic/index.js' // Importamos la lógica

import { CredentialsError, DuplicityError, NotFoundError, SystemError } from './errors.js' //importamos las clases de error personalizadas

const api = express() // Creamos una instancia de la aplicación Express

const port = 8080

const jsonBodyParser = json() // Middleware para parsear el cuerpo de la petición en formato JSON

// Ruta para una prueba sencilla de la API
api.get('hello', (req, res) => {
    console.log(req.path) // Imprime la ruta solicitada en la consola

    res.send('Hello World!') // Responde con un mensaje 'Hello, World!'
})

// Ruta para registrar un nuevo usuario
api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, username, password } = req.body // Extraemos los datos del cuerpo de la petición

        // Llamamos a la lógica de negocio para registrar al usuario
        logic.registerUser(name, email, username, password)

        res.status(201).send() // Respondemos con un estado 201 (Creado) si todo fue bien
    }catch(error) {
        console.error(error) // Si ocurre un error, lo imprimimos en consola

        let status = 500 // Asumimos que el error es del sistema por defecto
        let errorName = SystemError.name // Nombre del error como 'SystemError'

        // Si el eerror es de duplicidad (usuario ya existe)
        if(error instanceof DuplicityError) {
            status = 409 // Código HTTP 409 para conflicto
            errorName = error.constructor.name // Nombre del error específico
        }

        // Respondemos con el código de estado y el mensaje de error
        res.status(status).json({ error: errorName , message: error.message })
    }
})

// Ruta para autenticar a un usuario
api.post('/users/auth', jsonBodyParser, (req, res) => {
    try{
        const { username, password } = req.body // Extraemos los datos de autenticación

        // Llamamos a la lógica de negocio para autenticar al usuario
        const id = logic.authenticateUser(username, password)

        res.json(id) // Si la autenticación es correcta, respondemos con el ID del usuario
    } catch (error){
        console.error(error) // Si ocurre un error, lo imprimimos en consola

        let status = 500 // Asumimos que el error es del sistema por defecto
        let errorName = SystemError.name // Nombre del error como 'SystemError'

        // Si las credenciales son incorrectas
        if(error instanceof CredentialsError) {
            status = 401 // Código HTTP 401 para no autorizado
            errorName = error.constructor.name // Nombre del error específico
        }else if(error instanceof NotFoundError) {
            status = 404 // Código HTT 404 para no encontrado (usuario no existe)
            errorName = error.constructor.name // Nombre del error específico
        }

        // Respondemos con el código de estado y el mensaje de error
        res.status(status).json({ error: errorName , message: error.message })
    }
})

// El servidor esuchca en el puerto 8080
api.listen(port, () => console.log(`API listening on port ${port}`))