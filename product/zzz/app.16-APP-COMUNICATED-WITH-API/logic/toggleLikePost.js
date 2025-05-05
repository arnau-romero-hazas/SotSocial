
import { data } from "../data/index";
import { validate } from "./validate.js";

export const toggleLikePost = (postId) =>{
    validate.id(postId, 'postId')
    const { userId } = data

    // Solicitud al servidor de hacer un cambio en la propiedad likes de el array de objetos posts
    return fetch(`http://localhost:8080/posts/${postId}/likes`,{
        method: 'PATCH', // Mediante el metodo PATCH, que se usa solo para cambiar una parte de un elemento.
        headers:{ // En el headers le pasaremos la authorizazion usando nuestra iD para que verifique que somos un usuario registrado.
            Authorization: `Basic ${userId}`
        }
    })
        // Si hay un error en la solicitud HTTP lo capturamos
        .catch( error => { throw new Error(error.message) })
        // Si no hay error en la solicitud HTTP manejamos la respuesta del servidor:
        .then( response => {
            console.log(response.status)
            // Si la respuesta es 201( todo OK ) cerramos la funcion
            if (response.status === 204)
                return

            // Si la respuesta no es 201, la transformamos a JSON
            return response.json()
                // Un catch por si la respuesta no se puede convertir bien  JSON
                .catch( error => {throw new Error(error.message)})
                // Si se convierte bien a JSON, capturamos el mensaje y lanzamos el error.
                .then( body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}