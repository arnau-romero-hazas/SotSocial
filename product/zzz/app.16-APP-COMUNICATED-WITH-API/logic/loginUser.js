import { data } from "../data/index"
import { validate } from "./validate"


export const loginUser = (username, password) =>{
    validate.username(username, 'username') // validamos username
    validate.password(password, 'password') // validamos password

   return fetch('http://localhost:8080/users/auth', { 
    // El método fetch() se utiliza para realizar solicitudes HTTP en JavaScript (en los navegadores, o en entornos como Node.js si se usa una librería de node-fetch).
    // fetch() devuelve una promesa (Promise), lo que significa que el código continúa ejecutándose sin esperar la respuesta de la solicitud. Se maneja con .then() o async/awa
    /*
    'http://localhost:8080/users/auth' es la URL a la que se realiza la solicitud. 
     Aquí se está llamando al endpoint /users/auth del servidor que está corriendo en localhost (es decir, tu máquina local) en el puerto 8080.
     Este endpoint probablemente es el encargado de autenticar al usuario (por eso la ruta incluye "auth").
    */
        method: 'POST', // Metodo POST se usa para enviar datos al servidor, en este caso los de inicio de sesion
        headers: { // Los headers son metadatos que enviamos con la solicitud HTTP, en este caso:
            'Content-Type': 'application/json' // Le decimos al servidor que el cuerpo de la solicitud contiene datos en formato JSON, es importante para que el servidor interpete los datos correctamente.
        },
        body: JSON.stringify({ username, password }) // Body es donde se incluye el contenido de la solicitud. En este caos se esta enviando el Username y password en formato JSON.
                                                     // Usamos stringify para convertirlo en un string, es el formato en el que se deben enviar datos a un servidor.
   })
    // Manejamos el error en la soilicitud HTTP.
    .catch(error => { throw new Error(error.message)})
    // Manejamos respuesta en la solicitud HTTP.
    .then(response => {
        console.log(response.status)

        if(response.status === 200) // Si la respuesta tiene estado 200 (solicitud exitosa)
            return response.json() // Convertimos la respuesta en un objeto javaScript
                .catch(error => { throw new Error(error.message) }) // Si hay un error convirtiendolo a JSON lo capturamos aqui
                .then( body => { // Si la conversion es exitosa recibimos el body.
                    const { id } = body // Sacamos la iD del body
                  
                    data.userId = id // Y la guardamos en la base de datos
                })
        return response.json() // Si la respuesta del servidor no es un 200 
            .catch(error => { throw new Error(error.message) }) // Capturamos por si hay un error convirtiendolo a JSON
            .then( body => { // Si lo convertimos bien a JSON
                const { error, message } = body // Sacamos el mensaje de error del body

                throw new Error(message) // Lanzamos el error con el mensaje
            }
            )    
    })
}