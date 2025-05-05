import { data } from '../data/index.js'
import { getPosts } from './getPosts.js'

console.info('TEST getPosts')

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => { 
        try {
            let posts2

            return getPosts('67daf36942579b4194f66033')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts 2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
 