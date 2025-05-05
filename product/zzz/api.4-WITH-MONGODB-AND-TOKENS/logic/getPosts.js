import { data } from "../data/index.js"
import { validate, errors } from 'com'
import { SystemError } from "com/errors.js"

const { ObjectId } = data
const { NotFoundError } = errors
export const getPosts = userId => { // Crear funcion para obtener los posts de data, la llamaremos desde main
    validate.id(userId, 'userId')

    return data.users.findOne({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError(error.message)

            return data.posts.find().toArray()
                .catch(error => { throw new SystemError(error.message)})
            
        })
        .then(posts => {  
            const authors = posts.map(({ author }) => author)
            
            return data.users.find({_id: { $in: authors } }).toArray()
                .catch(error => { throw new SystemError(error.message)})
                .then(users => { 
                const aggregatedPosts = []
                
                for (let i = 0; i < posts.length; i++) {
                    const post = posts[i]
                    
                    let liked = false
                        
                    for (let i = 0; i < post.likes.length && !liked; i++) {
                            const userObjectId = post.likes[i]
                
                            if (userObjectId.toString() === userId)
                                liked = true
                    }
                
                    const user = users.find(user => user._id.toString() === post.author.toString())
                
                    const aggregatedPost = {
                        id: post._id.toString(),
                        author: {id: user._id.toString(), username: user.username},
                        image: post.image,
                        text: post.text,
                        createdAt: new Date(post.createdAt),
                        modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
                        liked: liked,
                        likesCount: post.likes.length,
                        own: post.author.toString() === userId
                
                    }
                        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
                }
                    return aggregatedPosts.reverse()
            })
    })      
}