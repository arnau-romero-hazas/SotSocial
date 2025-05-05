import { validate, errors } from "com";

const { SystemError } = errors

export const registerUser = (name, email, username, password) => {
    // Validamos todos los campos con la lógica de validación
    validate.text(name, 'name');
    validate.minLength(name, 1, 'name');
    validate.maxLength(name, 20, 'name');
    validate.email(email, 'email');
    validate.username(username, 'username');
    validate.password(password, 'password');

    // Llamamos a la API para registrar al usuario
    return fetch('http://localhost:8080/users', { // Fetch realiza una solicitud HTTP (en este caso, POST), a un servidor para registrar a un nuevo usuarip
        method: 'POST', // Methodo que POST
        headers: { // Especificar que los datos se enviaran en formato JSON
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password})
    })
        // MANEJO DE ERROES CON CATCH:
        .catch(error => { throw new Error(error.message) }) // Si ocurre un error durante la solicitud HTTP se captura con el catch.
        
        // MANEJO DE LA RESPUESTA DEL SERVIDOR:
        .then(response => {
            console.log(response.status)

            if(response.status === 201) // Si la respuesta del servidor es 201, signficia que el usuario fue creado cone exito.
                return // En caso de 201 terminamos la función.

            // Si el codigo no es 201, se intenta converitr la respuesta a JSON
            return response.json()
                // Si ocurre un error convirtiendo la respuesta a formato JSON se lanza un error
                .catch(error => { throw new Error(error.message) })
                
                // Si la conversion a JSON funciona obtenemos un objeto con un error y message del cuerpo de la respuesta.
                .then(body => {
                    const { error,message } = body // const error = body.error
                    
                    const constructor = errors[error] // const message = body.message
                   
                    throw new constructor(message)
                })
        })
}