// Importamos la configuración de variables de entorno desde un archivo .env
import 'dotenv/config';
import express from 'express'
// Importamos CORS para permitir solicitudes desde diferentes dominios
import cors from 'cors';

import { users, posts } from './routes/index.js'
import { errorHandler } from './handlers/index.js'
// Importamos módulos locales para gestionar la base de datos y la lógica de negocio
import { data } from './data/index.js';

// Extraemos las variables de entorno definidas en el archivo .env
const { PORT, MONGO_URL, MONGO_DB } = process.env;


// Conectamos a la base de datos usando las variables de entorno
data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error) // Si hay un error al conectar, lo mostramos en consola
    .then(() => {
        // Inicializamos la aplicación EXPRESS
        const api = express()

        // Activamos CORS en nuestra API
        api.use(cors())

        // Ruta de prueba para verificar que la API está en funcionamiento
        api.get('/', (req, res) => res.send('Hello, API!'))

        api.use('/users', users)
        api.use('/posts', posts)

        // Registramos el middleware de manejo de rrores
        api.use(errorHandler)

        // Ponemos a escuchar el servidor en el puerto especificado en las variables de entorno
        api.listen(PORT, () => console.log(`API running on port ${PORT}`))
    })