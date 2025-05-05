import 'dotenv/config'
import { data, User, Post, Comment} from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    { name: 'Arnau Romero', email: 'arnau@romero.com', username: 'arnau_sots', password: hash },
                    { name: 'Marc Ramos', email: 'marc@ramos.com', username: 'marc_ramos', password: hash },
                    { name: 'Eyla Garcia', email: 'eyla@garcia.com', username: 'eyla_garcia', password: hash },
                    { name: 'Aurora', email: 'aurora@hazas.com', username: 'aurorita', password: hash },
                    { name: 'Bollo', email: 'bollo@bollito.com', username: 'bollito', password: hash },
                    { name: 'Pan', email: 'pa@necillo.com', username: 'panecillo', password: hash }
                ])
            })
            .then(([arnau, marc, eyla, aurora, bollito, panecillo]) => {
                return Post.insertMany([
                    { author: arnau.id, image: 'https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'free day!', likes: []},
                    { author: marc.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW53Zjk1OWFrMjFyYmV3bDJqc3A5YjJhOHd1Nng3dnhpZjRlaXNtNSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/uQgXjl505BdYAv8H0X/giphy.gif', text: 'i am free!', likes: []},
                    { author: eyla.id, image: 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: []}
                ])
                    .then(([arnauPost, marcPost, eylaPost])=>{
                        const comment = new Comment({ author: arnau.id , text: 'Ta guapo eso tt' })

                        arnauPost.comments.push(comment)

                        return arnauPost.save()

                    })
            })
    })
    .finally(() => data.disconnect())