import { readFileSync, writeFileSync } from 'fs';

import { uuid } from './uuid.js';

export class Collection{
    // Constructor para inicializar la colección con un nombre específico
    constructor(name){
        this.name = name
    }
    // Obtiene todos los documentos de la data
    getAll(){
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        return collection
    }

    // Sobrescribe toda la colección con un nuevo array de data
    setAll(collection){
        const json = JSON.stringify(collection, null, 4)

        writeFileSync(`data/${this.name}.json`, json)
    }

    // Obtiene un documento por su ID
    getById(id){
        const json = readFileSync(`data/${this.name}.json`, 'utf8')

        const collection = JSON.parse(json)

        const document = collection.find(document => document.id === id) || null

        return document
    }

    // Inserta un nuevo documento en la colección
    insertOne(document){
        let json = readFileSync(`data/${this.name}.json`, 'utf8')
        const collection = JSON.parse(json)

        // Asigna un ID único al documento
        document.id = uuid()

        // Agrega el documento en la colección
        collection.push(document)

        // Guarda los cambios en el archivo
        json = JSON.stringify(collection, null, 4)
        writeFileSync(`data/${this.name}.json`, json)
    }

    // Busca un documento que cumpla con una condición dada
    findOne(condition){
        const json = readFileSync(`data/${this.name}.json`, 'utf8')
        const collection = JSON.parse(json)

        for (let i = 0; i < collection.length; i++){
            const document = collection[i]

            // Evalúa la condición pasa como callback (ej: post => post.id === postId)
            const matches = condition(document)

            // Si encuentra coincidencia, devuelve el docuemnto
            if (matches) return document
        }

        // Devuelve null si no encuentra coincidencias (corregido el comentario)
        return null
    }

    // Actualiza un documento existente
    updateOne(condition, document){
        let json = readFileSync(`data/${this.name}.json`, 'utf8')
        const collection = JSON.parse(json)

        // Busca el índice del documento a actualizar
        const index = collection.findIndex(condition)

        if (index === -1) return // Añadido: control si no encuentra el documento

        // Reemplaza el documento existente con el nuevo
        collection[index] = document

        // Guarda los cambios en el archivo
        json = JSON.stringify(collection, null, 4)
        writeFileSync(`data/${this.name}.json`, json)
    }

    // Elimina un documento que cumpla con una condición dada
    deleteOne(condition){
        let json = readFileSync(`data/${this.name}.json`, 'utf8')
        const collection = JSON.parse(json)

        // Busca el índice del documento a eliminar
        const index = collection.findIndex(condition)

        // Elimina el documento si lo encuentra
        if(index > -1)
            collection.splice(index,1)

        // Guarda los cambios en el archivo
        json = JSON.stringify(collection, null, 4)
        writeFileSync(`data/${this.name}.json`, json)
    }
}