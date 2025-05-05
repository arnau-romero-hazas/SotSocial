import mongoose, { Types } from 'mongoose'
import { errors } from 'com'
import { User, Post } from './models.js'

const { ObjectId } = Types

const { SystemError } = errors

const data = { 
    connect(url, dbName){
        return mongoose.connect(`${url}/${dbName}`)
            .catch(error => new SystemError(error.message))
    },

    disconnect(){
        return mongoose.disconnect()
    }
}

export {
    data,
    ObjectId,
    User,
    Post
}