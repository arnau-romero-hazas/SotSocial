import 'dotenv/config'
import { data, User } from '../data/index.js'
import { registerUser } from './registerUser.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { DuplicityError, SystemError } from 'com/errors.js'

const { MONGO_URL, MONGO_DB } = process.env

describe('registerUser', () => { // Describe agrupa todos los tests relacionados con registerUser.
    before(() => data.connect(MONGO_URL, MONGO_DB)) // Antes de realizar los test conectamos con la base de datos

    beforeEach(() => User.deleteMany({})) // Eliminar todos los usuarios antes de cada test, aseguramos que antes de cada test se comience con una base limpia.

    it('succeeds on new user', () => { // TEST 1: Si se crea bien un usuario nuevo
        let result2 // Creamos variable para capturar el resultado de register user

        return registerUser('arnau', 'ar@nau.com', 'arnau', '123123123') // Se llama a registerUser con los datos del nuevo usuario
            .then(result => result2 = result) // Asignamos el resultado a la variable antes creada
            .finally(() => expect(result2).to.be.undefined) // Se espera que registerUser no retorne ningun valor
            .then(() => User.findOne({ username: 'arnau' }).lean()) // Buscamos al usuario antes registrado por el nombre
            .then(user => {
                // Se comprueba que los datos ingresados en mongoDB coincidian con los ingresados
                expect(user.name).to.equal('arnau') 
                expect(user.email).to.equal('ar@nau.com')
                expect(user.username).to.equal('arnau')

                return bcrypt.compare('123123123', user.password) // bcrypt compara la contraseña ingresada con la almacenada en la base de datos, que esta encriptada.
            })
            .then(match => expect(match).to.be.true) // Se espera que las contraseñas coincidan

    })

    it('fails on existing user', () => { // TEST 2: Verificar que registerUser no permita crear un usuario duplicado. 
        let catchedError // Se declara una variable para almacenar cualquier error capturado

        // Creamos usuario en la base de datos directamente con la contraseña ya encpritada.
        // Esto simula que el usuario ya existe antes de llamar a registerUser
        return User.create({
            name: 'Arnau',
            email: 'ar@nau.com',
            username: 'arnau',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => registerUser('Arnau', 'ar@nau.com', 'arnau', '123123123')) // Se intenta registrar al mismo usuario
            .catch(error => catchedError = error) // Capturamos el error
            .finally(() => {
                // Verificamos que el error es correcto
                expect(catchedError).to.be.instanceOf(DuplicityError) // Se espera que registerUser lance un DuplicityError
                expect(catchedError.message).to.equal('user already exists') // Se verifica que el mensaje de error sea "user already exists"
            })
    })

    afterEach(() => User.deleteMany({})) // Eliminamos todos los usuarios después de cada test

    after(() => data.disconnect()) // Cerramos al conexion con mongoDB al finalizar todos los tests
})

/*
📌 Resumen
✔️ registerUser crea correctamente un usuario nuevo.
✔️ Si intentamos crear un usuario que ya existe, lanza un error.
✔️ La base de datos se limpia antes y después de cada test.
✔️ Se verifica que la contraseña se encripte correctamente.
✔️ La conexión con MongoDB se establece antes y se cierra al final.

*/
