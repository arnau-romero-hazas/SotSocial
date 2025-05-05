import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { logic } from '../logic/index.js'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            logic.loginUser(username, password)
                .then(() => {
                    form.reset()
                    onUserLoggedIn()
                    toast.success(`Welcome back! ${username}`)
                })
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ Error: ${error.message}`)
                })
        } catch (error) {
            console.error(error)
            toast.error(`❌ Error: ${error.message}`)
        }
    }

    console.debug('Login -> render')

    return (
        <div> 
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="your username..." required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="your password..." required />

                <button type="submit">Login</button>
            </form>

            <a onClick={onNavigateToRegister}>Register</a>
        </div>
    )
}