import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import 'dotenv/config'

const { MONGO_DB, MONGO_URL } = process.env

console.info('TEST authenticateUser')

data.connect(MONGO_URL,  MONGO_DB)
    .then(() => { 
        try{
          let userId

          return authenticateUser('arnau_sots', '123123123')
                .then(id => userId = id)
                .finally(() => console.assert(typeof userId === 'string', 'userId is a string'))   
        }catch(error){
                console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())