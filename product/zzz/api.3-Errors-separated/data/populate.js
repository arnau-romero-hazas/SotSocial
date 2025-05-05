import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        return users.find().toArray()
        // return users.updateOne({ name: "Arnau"}, { $set: { age: 28}})
        // return users.findOne({name : "Arnau"})
        // return users.insertOne({name : "Arnau" , username: "arnau_sots", email: "arnau@gmail.com", password: "123123123" , createdAt: new Date, modifiedAt: null })
        // return users.deleteOne({name: "Arnau" })
               
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())