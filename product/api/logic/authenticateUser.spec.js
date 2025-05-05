import 'dotenv/config'
import { data, User } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser' , () => {
    before(() => data.connect(MONGO_DB, MONGO_URL)) // Antes de ejecutar los test, conectamos la base de datos

    beforeEach(() => User.deleteMany({})) // Antes de cada test, eliminamos los usuarios de la base de datos para que los test sean independientes

    it('succeeds on existing user', () => { // Test 1: Prueba que authenticateUser funciona correctamente cuando el usuario y la contraseña son validos.
        let returnedUserId // Variable para guardar el ID del usuario autenticado

        return User.create({ // Creamos usuario en la base de datos
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau',
            password: '$2b$10$UOFDt5V3swVqWGRlX3Jt4Or3ESx50L2TlBjROP6WUxX.2zpMLEl4O'
        })
            .then(() => authenticateUser('arnau', '123123123')) // Lamamos a authenticateUser
            .then(userId => returnedUserId = userId) // Guardamos el userId retornado en la variable que hemos creado antes
            .finally(() => expect(returnedUserId).to.be.a.string) // Verificamos que el returnedUserId sea un string
            .then(() => User.findOne({username: 'arnau'}).lean()) // Buscamos en la base de datos el usuario por el username
            .then(user => expect(user._id.toString()).to.equal(returnedUserId)) // Verificamos usuario que encontremos en la base de datos su _id coincida con returnedUserId
    })

    it('fails on non-existing user', () => { // TEST 2: Falla si el usuario no existe
        let catchedError // Variable para capturar el error

        return authenticateUser('kakaroto', '123123123') // intentamos autenticar un usuario que no existe
            .catch(error => catchedError = error) // Capturamos el error y lo guaramos en catchedError
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError) // Verificamos que el catchedError sea una instancia de notFoundError
                expect(catchedError.message).to.equal('user not found') // Verificamos que el mensaje de error sea 'user not found'
            })
    })

    it('fails on existing user but wrong password', () => { // TEST 3: Falla si la contraseña es incorrecta
        let catchedError

        return User.create({ // Crear un usuario en la base de datos.
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('arnau_sots', '234234234')) // Intentamos autenticar una contraseña incorrecta (la correcta seria 123123123)
            .catch(error => catchedError = error) // Capturamos el error
            .finally(() => { 
                expect(catchedError).to.be.instanceOf(CredentialsError) // Verifica que sea una instancia de CredentialsError
                expect(catchedError.message).to.equal('wrong credentials') // Verificamos que el mensaje sea 'wrong credentials
            })
    })

    afterEach(() => User.deleteMany({})) // Borramos los usarios después de cada test para que no haya interferencias entre tests.

    after(() => data.disconnect()) // Cerramos la conexion con la base de datos cuando terminen los tests.
})