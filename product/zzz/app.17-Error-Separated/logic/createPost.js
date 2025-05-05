import { data } from '../data/index'
import { validate, errors } from 'com'

const { SystemError } = errors
export const createPost = (image, text) => { // Funcion para la logica de crear post
    validate.url(image, 'image')
    validate.maxLength(image, 1000, 'image')
    validate.text(text, 'text')
    validate.maxLength(text, 500, 'text')

    const { userId } = data
    // PETICIÓN FETCH PARA CREAR EL POST:
    return fetch('http://localhost:8080/posts',{ // Hacemos una petición POST a la API para crear el post
        method: 'POST',                          // Usamos el método POST
        headers: {                               // Configuramos los headers
            Authorization: `Basic ${userId}`,    // Enviamos el userId como autorización
            'Content-Type': 'application/json'   // Indicamos que el contenido es JSON
        },
        body: JSON.stringify({ image,text })     // Convertimos los datos del post a JSON para enviarlos
    })   
        // MANEJO DE ERRORES
        .catch(error => { throw new Error(error.message) }) // Si ocurre un error en la petición, lo capturamos y lanzamos un nuevo error con el mensaje
        //MANEJO DE LA RESPUESTA
        .then(response => {
            console.log(response.status === 201) // Logeamos si el estado es 201 (creado correctamente)

            if (response.status === 201)         // Si el post se creó bien, simplemente retornamos sin nada más
                return
            //Manejo de errores del backend:
            return response.json()               // Si el estado no es 201, intentamos parsear la respuesta como JSON
                .catch(error => { throw new Error(error.message)}) // Si falla al parsear el JSON, lanzamos un error
                .then(body => {                  // Si el JSON se parsea correctamente
                    const { error, message } = body // Extraemos el error y mensaje del cuerpo

                    const constructor = errors[error]
  
                    throw new constructor(message) // Lanzamos un error con el mensaje recibido del servidor
                })
        })
}       