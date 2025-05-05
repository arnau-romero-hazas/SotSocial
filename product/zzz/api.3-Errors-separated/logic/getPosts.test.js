import { getPosts } from './getPosts.js'

try {
    const posts = getPosts('m87gd1f1geq')

    console.log(posts)
} catch (error) {
    console.error(error)
}