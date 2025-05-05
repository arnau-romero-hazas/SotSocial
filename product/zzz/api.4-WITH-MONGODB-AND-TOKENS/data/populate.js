import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return users.insertMany([
                    { name: 'Arnau Romero', email: 'arnau@romero.com', username: 'arnau_sots', password: hash },
                    { name: 'Marc Ramos', email: 'marc@ramos.com', username: 'marc_ramos', password: hash },
                    { name: 'Eyla Garcia', email: 'eyla@garcia.com', username: 'eyla_garcia', password: hash },
                    { name: 'Aurora', email: 'aurora@hazas.com', username: 'aurorita', password: hash },
                    { name: 'Bollo', email: 'bollo@bollito.com', username: 'bollito', password: hash },
                    { name: 'Pan', email: 'pa@necillo.com', username: 'panecillo', password: hash }
                ])
            })
            .then(result => {
                const { 0: arnauId, 1: marcId, 2: eylaId, 3: auroraId, 4: bolloId, 5: panId } = result.insertedIds

                return posts.insertMany([
                    { author: arnauId, image: 'https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'free day!', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: marcId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW53Zjk1OWFrMjFyYmV3bDJqc3A5YjJhOHd1Nng3dnhpZjRlaXNtNSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/uQgXjl505BdYAv8H0X/giphy.gif', text: 'i am free!', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: eylaId, image: 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: [], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())