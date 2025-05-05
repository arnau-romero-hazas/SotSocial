import { Collection } from './collection'

export const data = {
    users: new Collection('users'),
    posts: new Collection('posts'),

    get userId(){
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id){
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },
}