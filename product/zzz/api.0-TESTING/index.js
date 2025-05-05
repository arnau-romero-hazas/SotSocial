const express = require('express') // importamos express, aqui importamos la líbreria Express.js, que facilita la creacion de servidores en Node.js
const app = express() // Creas una instancia de la aplicación Express para manejar rutas, peticiones y respuestas.
const port = 3000 // Definimos el puerto en el que se escuchara. https://localhost:3000

const users = [{"nombre": "Marc Ramos","edad": 25}] // array para poner los usuarios que se creen

app.use(express.json()) /* Aquí usamos el middleware de Express llamado express.json().
 Este middleware permite que Express pueda interpretar los cuerpos de las solicitudes (requests) que estén en formato JSON.
 Esto es necesario para manejar datos que vienen desde un formulario o cliente que envía JSON.*/

// Esta es una ruta GET que responde cuando el cliente visita la URL /rutaArnau.
// Cuando se hace una solicitud GET a esta ruta, la respuesta será un objeto JSON con un usuario ficticio (nombre, edad, y hobby).
// Esto simula la respuesta que podría dar una API.
app.get('/rutaArnau', (req, res) => {
    res.json( {user: 'me llamo Frank',
                     age: 18,
                     hobby: 'One piece'} )

})

//Esta es otra ruta GET, pero con un parámetro dinámico en la URL. El /saludo/:name indica que la ruta acepta un parámetro name.
// Por ejemplo, si haces una solicitud a /saludo/John, el valor de name será John y la respuesta será ¡Hola, John!.
// Este es un ejemplo de cómo trabajar con parámetros de ruta.
app.get('/saludo/:name', (req, res) => {
    const name = req.params.name // Accedemos al parámetro 'id' en la URL
    res.send( `¡Hola, ${ name } !`)

})
// Cuando una URL incluye una cadena de consulta (después de ?), puedes acceder a estos valores con req.query.
app.get('/buscar', (req, res) => {
    const nombre = req.query.nombre  // Accedemos al parámetro de consulta 'nombre'
    const edad = req.query.edad      // Accedemos al parámetro de consulta 'edad'
    res.send(`Buscando a: ${nombre}, Edad: ${edad}`)
    // ejemplo : URL: http://localhost:3000/buscar?nombre=Juan&edad=30
    // Salida: Buscando a: Juan, Edad: 30
})


app.post('/crear', (req, res) => { // app.post('/crear', ...): Esta ruta maneja las solicitudes POST a /crear.
    const { nombre, edad } = req.body // req.body: Aquí se obtiene el cuerpo de la solicitud (que se espera que sea un objeto JSON con nombre y edad).

    // Validar que lleguen los datos necesarios
    if (!nombre || !edad) {
        return res.status(400).send('Faltan datos: nombre y edad son obligatorios') // Si no se reciben los datos nombre o edad, la respuesta será un error 400 (petición incorrecta) con un mensaje.
    }

    // Crear usuario y agregar al array
    const nuevoUsuario = { nombre, edad }
    users.push(nuevoUsuario)

    // Responder con el usuario creado
    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario }) //  El servidor responde con un código 201 (creado) y un objeto JSON que contiene un mensaje y el nuevo usuario creado.
})

// Esta ruta GET responde cuando se visita /usuarios. La respuesta será el array users que contiene todos los usuarios que han sido creados hasta el momento.
// Por ejemplo, si se han creado 2 usuarios, la respuesta será un array con esos 2 objetos de usuario.
app.get('/usuarios', (req, res) => {
    res.json(users)
})

// Eliminar un usuario por nombre con DELETE
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase() // Convertimos a minúsculas para evitar problemas de mayúsculas/minúsculas

    // Buscar el índice del usuario en el array
    const index = users.findIndex(user => user.nombre.toLowerCase() === nombre)

    if (index !== -1) {
        // Eliminar el usuario del array si existe
        const usuarioEliminado = users.splice(index, 1)[0]
        res.json({ mensaje: 'Usuario eliminado', usuarioEliminado })
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }
})






// Finalmente, este código inicia el servidor Express en el puerto definido (en este caso, 3000).
// El mensaje Example app listening on port 3000 se imprime en la consola para confirmar que el servidor está corriendo correctamente.
// Una vez que el servidor está activo, puedes acceder a él a través de http://localhost:3000.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/*
Resumen del flujo:
El servidor Express se inicia y empieza a escuchar en el puerto 3000.
Hay varias rutas configuradas:
/rutaArnau: Devuelve un objeto con datos de usuario.
/saludo/:name: Saluda a la persona que se pasa como parámetro en la URL.
/crear: Crea un nuevo usuario con los datos nombre y edad enviados por el cliente.
/usuarios: Devuelve todos los usuarios creados hasta el momento.
*/
