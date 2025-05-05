import { logic } from '../logic/index.js'
import { toast } from 'react-toastify' // Importamos react-toastify
import 'react-toastify/dist/ReactToastify.css' // Importamos los estilos

export function Register({ onLoginClick, onRegisterSubmit }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form

            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset()

                    toast.success('Registro exitoso 🎉 ¡Inicia sesión ahora!')

                    onRegisterSubmit()
                })     
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ ${error.message}`)
                })       
                    
        } catch (error) {
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }

    console.debug('Register -> render')

    return (
        <div> 
            <h1>Register</h1>

            <form onSubmit={handleRegisterSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name..." />
                </div>

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="example@example.com" />
                </div>

                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Your Nickname..." />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Your password..." />
                </div>

                <button type="submit">Register</button>
            </form>

            <a onClick={onLoginClick}>Login</a>
        </div>
    )
}