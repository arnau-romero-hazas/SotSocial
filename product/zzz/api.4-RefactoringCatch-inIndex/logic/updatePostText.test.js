import { updatePostText } from './updatePostText.js'
import { data } from '../data/index.js'

console.info('TEST updatePost')

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => {
        try {
            let result2 = null
            return updatePostText('67dea84ae4885682c14d356f', '67dea8690e605b875128d316', 'hello amorsetr')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())