import { data } from '../data/index';  // Asegúrate de que 'data' tenga el token o alguna forma de obtenerlo
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export const addComment = (userId, postId, text) => {
    // Validación de los parámetros
    validate.id(postId, 'postId');
    validate.id(userId, 'userId');
    validate.text(text);

    const { token } = data; // Se asume que 'data' contiene el token de autenticación

    return fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`, // Pasamos el token como Authorization en los headers
            'Content-Type': 'application/json', // Definimos el tipo de contenido como JSON
        },
        body: JSON.stringify({ text }), // Enviamos el comentario como JSON
    })
    .catch(error => {
        // Si ocurre un error en la solicitud, lo capturamos y lanzamos un nuevo error con el mensaje
        throw new SystemError(error.message);
    })
    .then(response => {
        // Si la respuesta no es exitosa, manejamos el error
        if (response.status === 201) {
            return; // Si la respuesta es 201 (creado correctamente), no retornamos nada más
        }

        return response.json() // Si el estado no es 201, intentamos parsear la respuesta como JSON
            .catch(error => {
                // Si ocurre un error al parsear el JSON, lanzamos un error
                throw new SystemError(error.message);
            })
            .then(body => {
                const { error, message } = body; // Extraemos el error y mensaje del cuerpo de la respuesta
                const constructor = errors[error]; // Obtenemos el tipo de error correspondiente
                throw new constructor(message); // Lanzamos el error con el mensaje recibido
            });
    });
};
