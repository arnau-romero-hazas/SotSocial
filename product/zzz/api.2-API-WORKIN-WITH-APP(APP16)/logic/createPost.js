import { data } from '../data/index.js'
import { validate } from './validate.js'

export const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.url(image, 'image')
    validate.maxLength(1000)
    validate.text(text, 'text')
    validate.maxLength(500)
    
    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('User does not exist')
        
    const post ={
        author: userId,
        image: image,
        text: text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: []
    }
    data.posts.insertOne(post)
}