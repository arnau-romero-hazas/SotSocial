import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError } = errors

// import { NotFoundError, OwnershipError } from '../errors.js'

export const updatePostText = (postId, text) => {
    validate.id(postId, 'postId')

    const { token } = data

    return fetch(`http://localhost:8080/posts/${postId}/text`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if (response.status === 204)
                return

            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}



// import { data } from "../data/index.js";
// import { validate } from "./validate.js"

// export const updatePostText = (postId, text) => {
//     validate.id(postId, 'postId')
    
//     const {userId} = data 
    
//     return fetch(`http://localhost:8080/posts/${postId}/text`, {
//         method: 'PATCH', // Indicamos metodo que vamos a usar
//         headers: {  
//             Authorization : `Basic ${userId}`, // Le pasamos los datos de autorización
//             'Content-Type' : 'application/json' // Le pasamos el formato en el que va a recibir los datos.
//         },
//         body : JSON.stringify({ text }) // Y le pasamos el body, que va a ser el texto a cambiar, en formato JSON.stringify que es como trabaja el servidor.
//     })
//         .catch(error => {throw new Error(error.message) }) // Capturamos el error en caso de que falle la solicitud HTTP
//         .then(response =>{ // Si la solicitud http va bien
//             console.log(response.status) // Mostramos el codigo del servidor    

//             if(response.status === 204) // Si el mensaje es ok cerramos la funcion
//                 return
//             return response.json() // Si no es ok convertimos el mensaje a JSON
//                 .catch(error => { throw new Error(error.message)}) // si convertir a JSON falla lanzamos un error con el mensaje
//                 .then(body => { // Si la conversion a JSON va bien, capturamos el mensaje de error y lo lanzamos.
//                     const{ error, message } = body

//                     throw new Error(message)
//                 })
//         })
// }
