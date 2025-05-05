import { data } from '../data/index.js'
import { validate, errors } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, DuplicityError } = errors

export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password') 

    return data.users.findOne( { $or: [{ email }, { username }]})
        .catch(error => { throw new SystemError(error.message)})
        .then(user =>{
            if (user) throw new DuplicityError('user already exists')
            
            return bcrypt.hash(password, 10)
                .catch(error => { throw new SystemError(error.message)})
        })
        .then(hash => {  
                
             const user = {
                name: name,
                email: email,
                username: username,
                password: hash,
                createdAt: new Date(),
                modifiedAt: null
             }
             
             return data.users.insertOne(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exist')

                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}