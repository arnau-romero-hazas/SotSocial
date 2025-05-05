import logic from '../logic'
function Register({ onLoginClick, onRegisterSubmit }){
    const handleRegisterSubmit = event => {
        event.preventDefault()

        try {
            const{ target: form } = event

            const{
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form
            
            logic.registerUser(name, email, username, password)

            form.reset()

            onRegisterSubmit()
        } catch (error){
            console.error(error)

            alert(error.message)
        }

    }

    console.debug('Register -> render')

    
    
    return <div> 
        <h1>Register</h1>

        <form onSubmit={handleRegisterSubmit}>
            <div className="field"> {/* Agrupo las labels y las inputs en divs para poder aplicarle estilos conjuntamente en el archivo style.css*/}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name..."/>
            </div>

            <div className="field">
            <label htmFor="email">E-mail</label>
            <input type="email" id="email" placeholder="example@example.com"/>
            </div>
            
            <div className="field">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="your Nickname..."/>
            </div>
            
            <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Your password..."/>
            </div>

            <button type="submit">Register</button>
        </form>

        <a onClick={onLoginClick}>Login</a>
    </div>
}

export default Register