import { data, User, Post } from '../data/index.js'
import { createPost } from './createPost.js'
import { expect } from 'chai'
import { NotFoundError, SystemError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('createPost', () => {
   
    before(() => data.connect(MONGO_URL, MONGO_DB)) // Conectar a la base de datos antes de los test

    beforeEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})])) // Limpiar base ded atos antes de cada test

    it.only('succeeds on existing user', () => { // TEST 1: Usuario existe, la logica retorna el post
        
        let returnedPost

        debugger
        return User.create({
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: '$2b$10$UOFDt5V3swVqWGRlX3Jt4Or3ESx50L2TlBjROP6WUxX.2zpMLEl4O'
        })
            // Creamos post
            .then(user => createPost(user.id, 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZtYWFqMnhvZmE1aHZvbnZpbTNhcjg0eTNlZzN1c3h1OXAxbTBxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HsXIIRCbROJaQIHTfb/giphy.gif', 'Happy Sunday!'))
            .then(() => Post.findOne({author: user.id}).lean()) // Buscar el post creado
            .then(post => {
                expect(post).to.exist
                expect(post.author.toString()).to.equal(user.id)
                expect(post.image).to.equal('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZtYWFqMnhvZmE1aHZvbnZpbTNhcjg0eTNlZzN1c3h1OXAxbTBxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HsXIIRCbROJaQIHTfb/giphy.gif')
                expect(post.text).to.equal('Happy Sunday!')
            })
    })

    it('fails on non-existing user', () => { // TEST 2: Fallo en usuario no existe
        let catchedError

        return createPost(new ObjectId().toString(), 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZtYWFqMnhvZmE1aHZvbnZpbTNhcjg0eTNlZzN1c3h1OXAxbTBxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HsXIIRCbROJaQIHTfb/giphy.gif', 'Happy Sunday!')
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User does not exist')
            })
    })

    it('fails on invalid image URL', () => { // TEST 3: Fallo en url imagen invalido
        let catchedError

        return User.create({
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: '$2b$10$UOFDt5V3swVqWGRlX3Jt4Or3ESx50L2TlBjROP6WUxX.2zpMLEl4O'
        })
            .then(user => createPost(user.id, 'invalid-url', 'Happy Sunday!'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(SystemError) // Suponiendo que validate.url lanza SystemError
            })
    })

    it('fails on too long text', () => { // TEST 4: Fallo en texto demasiado largo
        let catchedError

        return User.create({
            name: 'Arnau Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: '$2b$10$UOFDt5V3swVqWGRlX3Jt4Or3ESx50L2TlBjROP6WUxX.2zpMLEl4O'
        })
            .then(user => createPost(user.id, 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZtYWFqMnhvZmE1aHZvbnZpbTNhcjg0eTNlZzN1c3h1OXAxbTBxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HsXIIRCbROJaQIHTfb/giphy.gif', 'A'.repeat(501)))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(SystemError) // Suponiendo que validate.maxLength lanza SystemError
            })
    })

    afterEach(() => Promise.all([User.deleteMany({}), Post.deleteMany({})])) // Limpiar base de datos después de cada test

    after(() => data.disconnect()) // Desconectar base de datos después de los tests
})
