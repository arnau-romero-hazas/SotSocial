import { data } from '../data/index.js';
import { registerUser } from './registerUser.js';

console.info( 'TEST registerUser ')

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return registerUser('Arnau Romero', 'arnau@romero.com', 'Arnau', '123123123')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

