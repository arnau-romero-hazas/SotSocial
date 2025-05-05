// Importamos Express y el middleware para parsear el cuerpo de las peticiones en JSON
import express, { json } from 'express';
import cors from 'cors' // Importamos cors 
import { errors } from 'com'
// Importamos la lógica de negocio
import { logic } from './logic/index.js';
import { data } from './data/index.js'
// Importamos libreria para generar los tokens
import jwt from 'jsonwebtoken'

// Importamos clases de error personalizadas
const { CredentialsError, DuplicityError, NotFoundError, SystemError, ValidationError, OwnershipError } = errors 

const JWT_SECRET = 'er diablo mamahuevo' // Es una clave secreta usada para firmar el token, evitando que otros puedan generarlo o modificarlo sin permiso.

//Conectamos con el servidor de MONGOdb
data.connect('mongodb://127.0.0.1:27017', 'test')
    .catch(console.error)
    .then(()=>{
    // Creamos una instancia de la aplicación Express
    const api = express();

    // Definimos el puerto en el que escuchará el servidor
    const port = 8080;

    // Middleware para parsear el cuerpo de la petición en formato JSON
    const jsonBodyParser = json();

    api.use(cors()) // Llamamos cors para permitir solicitudes desde otro puerto ( acces control all origin )

    /* ============================== */
    /*  DEFINICIÓN DE RUTAS DEL SERVIDOR  */
    /* ============================== */

    // Ruta GET para comprobar si el servidor está funcionando
    api.get('/hello', (req, res) => {
        console.log(req.path); // Imprime en consola la ruta solicitada
        res.send('Hello, World!'); // Responde con un mensaje simple
    });

    // Ruta POST para registrar un nuevo usuario
    api.post('/users', jsonBodyParser, (req, res) => {
        try {
            // Extraemos los datos del cuerpo de la petición
            const { name, email, username, password } = req.body;

            // Llamamos a la lógica de negocio para registrar al usuario
            logic.registerUser(name, email, username, password)
                 .then(() => res.status(201).send())
                 .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof DuplicityError) {
                        status = 409
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                 })

        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    });

    // Ruta POST para autenticar a un usuario
    api.post('/users/auth', jsonBodyParser, (req, res) => {
        try {
            // Extraemos el username y password del cuerpo de la petición
            const { username, password } = req.body;

            // Llamamos a la lógica de autenticación
            logic.authenticateUser(username, password)
                .then(id => {
                    const token = jwt.sign({ sub: id }, JWT_SECRET) // jwt.sign() Es una función de la librería jsonwebtoken que crea un token firmado.
                                                                    // { sub: id} "sub" es un campo estándar en JWT ( sub significa "subject", es decir, el identificador del usuario)
                                                                    // Se esta guardando el ID del usuario dentro del token para identificarlo en futuras solicitudes

                    res.json({ token }) // Se responde al cliente con un objeto JSON que contiene el token, para que luego pueda usarlo en futuras peticiones para autenticarse.
                })
                .catch(error => {
                    console.error(error); // Mostramos el error en la consola

                    let status = 500;
                    let errorName = SystemError.name;
                
        
                    // Si las credenciales son incorrectas
                    if (error instanceof CredentialsError) {
                        status = 401; // Código HTTP 401 (No autorizado)
                        errorName =  error.constructor.name
                    } else if (error instanceof NotFoundError) {
                        status = 404; // Código HTTP 404 (No encontrado)
                        errorName = error.constructor.name;
                    }
        
                    res.status(status).json({ error: errorName, message: error.message });
                })
        } catch (error) {
            console.error(error); // Mostramos el error en la consola

            let status = 500;
            let errorName = SystemError.name
            

            // Si las credenciales son incorrectas
            if (error instanceof ValidationError) {
                status = 400; // Código HTTP 401 (No autorizado)
                errorName = error.constructor.name;
            } 
            res.status(status).json({ error: errorName, message });
        }
    });

    // Ruta GET para obtener el nombre del usuario autenticado
    api.get('/users/self/name', (req, res) => {
        try {
            // Extraemos el token de autorización del encabezado
            const { authorization } = req.headers;

            // Extraemos el userId del token (se asume que el token empieza con "Bearer ")
            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            logic.getUserName(userId)
                .then(name => res.json({ name }))
                .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof NotFoundError) {
                        status = 404
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                })   
        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    });

    // Ruta POST para crear un nuevo post
    api.post('/posts', jsonBodyParser, (req, res) => {
        try {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { image, text } = req.body;

            logic.createPost(userId, image, text)
                .then(() => res.status(201).send())
                .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof NotFoundError) {
                        status = 404
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                })    

            res.status(201).send();
        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    });

    // Ruta GET para obtener los posts del usuario autenticado
    api.get('/posts', (req, res) => {
        try {
            const { authorization } = req.headers;

            const token = authorization.slice(7)
            
            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            logic.getPosts(userId)
                .then(posts => res.json(posts))
                .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof NotFoundError) {
                        status = 404
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                })
        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    });

    // Ruta DELETE para eliminar un post
    api.delete('/posts/:postId', (req, res) => {
        try {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { postId } = req.params;

            logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
                .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof NotFoundError) {
                        status = 404
                        errorName = error.constructor.name
                    } else if (error instanceof OwnershipError) {
                        status = 403
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                })
        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    });

    // Ruta PATCH para alternar un "like" en un post
    api.patch('/posts/:postId/likes', (req, res) => {
        try {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { postId } = req.params;

            logic.toggleLikePost(userId, postId)
                .then(() => res.status(204).send())
                .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof NotFoundError) {
                        status = 404
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                })     
        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    });

    api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
        try {
            const { authorization } = req.headers

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            const { postId } = req.params

            const { text } = req.body

            logic.updatePostText(userId, postId, text)
                .then(() => res.status(204).send())
                .catch(error => {
                    console.error(error)

                    let status = 500
                    let errorName = SystemError.name

                    if (error instanceof NotFoundError) {
                        status = 404
                        errorName = error.constructor.name
                    } else if (error instanceof OwnershipError) {
                        status = 403
                        errorName = error.constructor.name
                    }

                    res.status(status).json({ error: errorName, message: error.message })
                })
        } catch (error) {
            console.error(error)

            let status = 500
            let errorName = SystemError.name

            if (error instanceof ValidationError) {
                status = 400
                errorName = error.constructor.name
            }

            res.status(status).json({ error: errorName, message: error.message })
        }
    })

    // Iniciamos el servidor en el puerto 8080
    api.listen(port, () => console.log(`API listening on port ${port}`));
 })