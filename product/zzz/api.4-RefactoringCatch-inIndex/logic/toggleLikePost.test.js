import { toggleLikePost } from './toggleLikePost.js'
import { data } from '../data/index.js'

console.info('TEST toggleLikePost')

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67dea84ae4885682c14d356f', '67dea8690e605b875128d316')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())