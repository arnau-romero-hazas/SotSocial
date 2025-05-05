import { constant } from 'com'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    name:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        match: constant.NAME_REGEX
    },
    email: {
        type: String,
        required: true,
        match: constant.EMAIL_REGEX,
        maxLength: 30,
        unique: true
    },
    username: {
        type : String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
        // match: constant.USERNAME_REGEX,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const comment = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    text: {
        type: String,
        required: true,
        maxLength: 200,
        minLength: 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        match: constant.URL_REGEX,
        maxLength: 500,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLength: 500,
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    },
    comments: [ comment ]
})

const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)

export {
    User, 
    Post,
    Comment
}