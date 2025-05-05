import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

console.info('TEST getUserUsername')

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => {
        try {
            let userName
            return getUserName("67daf36942579b4194f66033")
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())