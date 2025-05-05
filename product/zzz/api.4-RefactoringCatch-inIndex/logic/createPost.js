import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { ObjectId } = data
const { NotFoundError, SystemError } = errors

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(1000)
    validate.text(text, 'text')
    validate.maxLength(500)
    
    return data.users.findOne({ _id: new ObjectId(userId)})
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError('User does not exist')
        
                const post ={
                    author: new ObjectId(userId),
                    image,
                    text,
                    createdAt: new Date(),
                    modifiedAt: null,
                    likes: []
                }

                return data.posts.insertOne(post)
                    .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { }) // Finalizar la promesa.
}