import { MongoClient, ObjectId  } from "mongodb";
import { errors } from 'com'

const { SystemError } = errors

let client // Client almacena la instancia MongoClient, lo que permite conectarse y desconectarse.

export const data = { // Data es un objeto que tiene dos propiedades que se inicializan en null, users y posts.
    users: null, 
    posts: null,

    connect(url, dbName){
         // Se crea una instancia de MongoClient con la URL de conexión. La referencia se guarda en client para poder cerrarla más tarde.
        return(client = new MongoClient(url))
         // Se intenta conectar a MongoDB usando conect(), esto decuelve una promesa, por lo que podemos usar .catch() y .then()
        .connect()
            .catch(error => new SystemError(error.message)) // Capturamos errores de coenxion
            .then(client => { 
                // Si la conexion es exitosa, se obtiene una referencia a la base de datos con client.db(dbName)
                const db = client.db(dbName) 
                
                // Luego se guardan las referencias a las colleciones user y posts dentro de data.
                data.users = db.collection('users') 
                data.posts = db.collection('posts')
            })
    },
    // Cierra la conexión con la base de datos llamando a client.close(). Esto libera recursos y evita conexiones innecesarias.
    disconnect(){
        return client.close()
    },
    // Se exporta ObjectId, lo que permite convertir strings en ObjectId de MongoDB.
    // Normalmente, esto se usa para hacer consultas con _id, por ejemplo:
    ObjectId
}