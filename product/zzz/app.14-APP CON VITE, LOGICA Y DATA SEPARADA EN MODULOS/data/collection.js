import { uuid } from "./uuid.js";

// Creamos classe collection para manejar los datos con la localStore
export class Collection{
    // hacemos constructora para traer name
    constructor(name){
        this.name = name
    }


    getAll(){
        // Obtenemos todos los datos de la local Storage, los transformamos a objeto y los retornamos.
        const collection = JSON.parse(localStorage[this.name] || '[]')

        return collection
    }

    setAll(collection){
        // Transformamos nuestro objeto a string para guardarlo en la local Store.
        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }

    getById(id){
        // Traemos la informacion de la local Storage
        const collection = JSON.parse(localStorage[this.name] || '[]')

        // buscamos en la informacion de la localStorage la id que pasamos por parametro a la funcion mediante el metodo de arrays find., si no lo encontramos retormanos un null
        const document = collection.find(document => document.id === id) || null

        return document
    }

    insertOne(document){
        const collection = JSON.parse(localStorage[this.name] || '[]')

        // genero una id para document con nuestra funcion de generar id
        document.id = uuid()

        //pusheamos en collection que nos hemos traido antes de la local storage la id que hemos generado
        collection.push(document)

        // passamos collection a string JSON
        const json = JSON.stringify(collection)

        // y lo guadramos en la localstorage
        localStorage[this.name] = json
    }

    findOne(condition){
        const collection = JSON.parse(localStorage[this.name] || '[]')
        // iteramos por los post o usuarios que hemos traido de la localStorage
        for (let i = 0; i < collection.length; i++){
            const document = collection[i]
            // buscamos si coincide mediante la callback (post => post.id === postId) llamada desde logic en toggleLike, o en loginUser con (user => user.username === username)
            const matches = condition(document)
            // si devuelve tru , devolvemos el documento
            if (matches) return document
        }
        // si no lo encontramos devolvemos un true
        return null
    }

    updateOne(document){
        const collection = JSON.parse(localStorage[this.name] || '[]')
        // buscamos en que index de nuestros datos en la store (ya que sera un array podemos iterar) esta el post que coincide con el post que hemos traido desde togglelike mediante la id.
        const index = collection.findIndex(doc => doc.id === document.id)
        // al tener el index en el que se encuentra el post podemos machacarlo con el mismo post pero con los likes actualizados.
        collection[index] = document
        // lo llevamos a tipo stringify para poder guardarlo luego en la localStorage otra vez.
        const json = JSON.stringify(collection)
        // lo guardamos en la localStorage
        localStorage[this.name] = json
    }

    deletedOne(condition){
        const collection = JSON.parse(localStorage[this.name] || '[]')

        const index = collection.findIndex(condition)

        // cuando encontremos el index eliminamos el post con el metodo splice(desde el index, un elemento)
        if(index > -1)
            collection.splice(index,1)

        const json = JSON.stringify(collection)

        localStorage[this.name] = json
    }
}