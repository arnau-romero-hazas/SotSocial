import { User } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, DuplicityError } = errors

export const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            const user = {
                name: name,
                email: email,
                username: username,
                password: hash
            }

            return User.create(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists')

                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}