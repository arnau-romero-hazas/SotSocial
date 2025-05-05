import { getUserName } from './getUserName.js'

try {
    const user = getUserName("m87gd1f1geq")

    console.log(user)
} catch (error) {
    console.error(error)
}