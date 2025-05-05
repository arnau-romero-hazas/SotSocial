// Importamos Express y el middleware para parsear el cuerpo de las peticiones en JSON
import express, { json } from 'express';
import cors from 'cors' // Importamos cors 

// Importamos la lógica de negocio
import { logic } from './logic/index.js';

// Importamos clases de error personalizadas
import { CredentialsError, DuplicityError, NotFoundError, SystemError, ValidationError, OwnershipError } from './errors.js';

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
        logic.registerUser(name, email, username, password);

        // Enviamos una respuesta de éxito con el código 201 (Created)
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error); // Mostramos el error en la consola

        // Definimos los valores por defecto en caso de error
        let status = 500;
        let errorName = 'SystemError';
        let message = 'Error interno del servidor';

        // Si el error es de duplicidad (usuario ya existe)
        if (error instanceof DuplicityError) {
            status = 409; // Código HTTP 409 para conflicto
            errorName = error.constructor.name;
            message = 'El usuario ya existe';
        }

        // Enviamos una respuesta de error con el código correspondiente
        res.status(status).json({ error: errorName, message });
    }
});

// Ruta POST para autenticar a un usuario
api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        // Extraemos el username y password del cuerpo de la petición
        const { username, password } = req.body;

        // Llamamos a la lógica de autenticación
        const id = logic.authenticateUser(username, password);

        // Enviamos una respuesta con el ID del usuario autenticado
        res.status(200).json({ message: 'Autenticación exitosa', id });
    } catch (error) {
        console.error(error); // Mostramos el error en la consola

        let status = 500;
        let errorName = 'SystemError';
        let message = 'Error interno del servidor';

        // Si las credenciales son incorrectas
        if (error instanceof CredentialsError) {
            status = 401; // Código HTTP 401 (No autorizado)
            errorName = error.constructor.name;
            message = 'Credenciales incorrectas';
        } else if (error instanceof NotFoundError) {
            status = 404; // Código HTTP 404 (No encontrado)
            errorName = error.constructor.name;
            message = 'Usuario no encontrado';
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
        const userId = authorization.slice(6);

        // Obtenemos el nombre del usuario desde la lógica de negocio
        const name = logic.getUserName(userId);

        res.json({ name });
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
            status = 400;
            errorName = error.constructor.name;
        } else if (error instanceof NotFoundError) {
            status = 404;
            errorName = error.constructor.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
    }
});

// Ruta POST para crear un nuevo post
api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers;
        const userId = authorization.slice(6);
        const { image, text } = req.body;

        logic.createPost(userId, image, text);

        res.status(201).send();
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
            status = 400;
            errorName = error.constructor.name;
        } else if (error instanceof NotFoundError) {
            status = 404;
            errorName = error.constructor.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
    }
});

// Ruta GET para obtener los posts del usuario autenticado
api.get('/posts', (req, res) => {
    try {
        const { authorization } = req.headers;
        const userId = authorization.slice(6);
        const posts = logic.getPosts(userId);

        res.json(posts);
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
            status = 400;
            errorName = error.constructor.name;
        } else if (error instanceof NotFoundError) {
            status = 404;
            errorName = error.constructor.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
    }
});

// Ruta DELETE para eliminar un post
api.delete('/posts/:postId', (req, res) => {
    try {
        const { authorization } = req.headers;
        const userId = authorization.slice(6);
        const { postId } = req.params;

        logic.deletePost(userId, postId);

        res.status(204).send();
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
            status = 400;
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
});

// Ruta PATCH para alternar un "like" en un post
api.patch('/posts/:postId/likes', (req, res) => {
    try {
        const { authorization } = req.headers;
        const userId = authorization.slice(6);
        const { postId } = req.params;

        logic.toggleLikePost(userId, postId);

        res.status(204).send();
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
            status = 400;
            errorName = error.constructor.name;
        } else if (error instanceof NotFoundError) {
            status = 404;
            errorName = error.constructor.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
    }
});

api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers

        const userId = authorization.slice(6)

        const { postId } = req.params

        const { text } = req.body

        logic.updatePostText(userId, postId, text)

        res.status(204).send()
    } catch (error) {
        console.error(error)

        let status = 500
        let errorName = SystemError.name

        if (error instanceof ValidationError) {
            status = 400
            errorName = error.constructor.name
        } else if (error instanceof NotFoundError) {
            status = 404
            errorName = error.constructor.name
        } else if (error instanceof OwnershipError) {
            status = 403
            errorName = error.constructor.name
        }

        res.status(status).json({ error: errorName, message: error.message })
    }
})

// Iniciamos el servidor en el puerto 8080
api.listen(port, () => console.log(`API listening on port ${port}`));
