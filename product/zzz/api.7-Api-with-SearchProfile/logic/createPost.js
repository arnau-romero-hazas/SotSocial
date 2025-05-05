import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(image, 500, 'image')
    validate.text(text)
    validate.maxLength(text, 500, 'text')
    
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError('User does not exist')
        
            const post ={
                author: userId,
                image,
                text
            }

            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { }) // Finalizar la promesa.
}