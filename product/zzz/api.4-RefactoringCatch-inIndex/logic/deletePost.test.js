import { deletePost } from './deletePost.js'
import  { data } from '../data/index.js'

console.info('TEST deletepost')

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return deletePost( '67daf36942579b4194f66033', '67dd8de0376d958e8cae989a' )
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        }catch(error){
            console.error(error)
        }
    })  
    .catch(error => console.error(error))
    .finally(() => data.disconnect()) 
       