import { data } from  './index.js'

data.connect('mongodb://127.0.0.1:27017')
    .then(() => data.users.insertOne({ name: 'Eyla', email: 'eyla@gmail.com', username: 'Eyla-moquet', password: '123123123'}))
    .then(result => console.log(result))
    .then(() => console.log('the end'))
    .catch(console.error)
    .finally(() => data.disconnect())