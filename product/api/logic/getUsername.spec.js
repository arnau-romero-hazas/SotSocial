import 'dotenv/config' // Carga variables de entorno desde un archivo .env
import { data, User } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'
import {  expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB} = process.env // Credenciales de la base de datos obtenidas de las variables de entorno.
const { ObjectId } = Types // Permite generar un ID válido de MongoDB

describe('getUserName', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB)) // Conectar a la base de datos antes de correr los tests

    beforeEach(() => User.deleteMany({})) // Vaciar la base de datos antes de cada test

    it('succeeds on existing user', () => { // TEST 1: Verificamos que getUserUsername funcione correctamente cuando el usario existe
        let returnedName // Declaramos una variable para almacenar el nombre devuelto por la función.

        return User.create({ // Creamos un usuario en la base de datos
            name: 'Arnau',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: '$2b$10$AwhRGI0bzIxXLyo7fXYVj.LPiLEuakgzEs3AOs57lWMXGEQMvI0Ma'
        })
            .then(user => getUserUsername(user.id)) // LLamamos a getUserUsername con el Id del usuario que acabamos de crear.
            .catch(name => returnedName = name) // Si getUserUsername devuelve un nombre, se almacena en returnedName
            .finally(() => expect(returnedName).to.equal('Arnau')) // Verificamos que el nombre devuelto sea "Arnau"
    })

    it('fails on non-existing user', () => { // TEST 2: Verificamos que getUserUsername lance un error si el usuario no existe
        let catchedError // Variable para almacenar el error capturado

        return getUserUsername(new ObjectId().toString()) // Se llama a getUserUsername con un Id que no exisste en la base de datos
            .catch(error => catchedError = error) // Si getUserUsername lanza un error, se guarda en catchedError
            .finally(() => {
                // Se verifica que el error sea una instancia de NotFoundError y que el mensaje sea "user not found".
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany({})) // Vaciar la base de datos después de cada test

    after(() => data.disconnect()) // Desconectar la base de datos al finalizar los tests
})

/*
Resumen
Este test valida:

Que getUserUsername devuelva el nombre correcto cuando el usuario existe.

Que getUserUsername lance un NotFoundError si el usuario no existe.

Que la base de datos esté limpia antes y después de cada test.

Que se conecte y desconecte de MongoDB correctamente.
*/