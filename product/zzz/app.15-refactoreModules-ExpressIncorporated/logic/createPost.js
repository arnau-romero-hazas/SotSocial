import { data } from '../data/index'
import { validate } from './validate'

export const createPost = (image, text) => { // Funcion para la logica de crear post
    validate.url(image, 'image')
    validate.maxLength(1000)
    validate.text(text, 'text')
    validate.maxLength(500)

    const { userId } = data

    const post = {
        author: userId,
        image: image,
        text: text,
        createdAt: new Date(),
        modifiedAt: null,
        likes: []
    }

    data.posts.insertOne(post)
}