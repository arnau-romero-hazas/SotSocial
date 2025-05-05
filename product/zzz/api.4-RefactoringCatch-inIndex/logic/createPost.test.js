import { data } from '../data/index.js'
import { createPost } from './createPost.js'

console.info('TEST createPost')

data.connect('mongodb://127.0.0.1:27017', 'test')
   .then(()=> {
        try {
            let result2 = null

            return createPost("67dea84ae4885682c14d356f", 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODZpcXVlbWhyaXM1Z2lpenU4c2F1bGh5N2l0M3ZlZGJ4YTF0OWtydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sA67Sa7qtAF8Y/giphy.gif', 'HOLA BOUGENI')
                .then(result => result2 = result )
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
   }) 
  .catch(error => console.error(error))
  .finally(() => data.disconnect())
