import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

const { MONGO_URL, MONGO_DB } = process.env
console.info('TEST getUserUsername')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userName
            return getUserName("67eaa0bf8f6047be71e7a678")
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())