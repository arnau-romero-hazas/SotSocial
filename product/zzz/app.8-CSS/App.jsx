function App(){
    // Estado inicial del usestate en landing.
    const [view, setView] = useState('landing')
    // Si clickamos en el register anchor de landing cambiamos el setView a register.
    const handleRegisterClick = () => setView('register')
    // Si clickamos en el login anchor de landing cambiamos el setView a login.
    const handleLoginClick = () => setView('login')
    // Si clickamos en el boton register de login cambiamos el setView a login.
    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    console.debug('App -> render')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick}/>}

        {view === 'register' && <Register onLoginClick = {handleLoginClick} onRegisterSubmit = {handleRegisterSubmit}/>}

        {view === 'login' && <Login onRegisterClick= {handleRegisterClick} onLoginSubmit={handleLoginSubmit }/>}

        {view === 'home' && <Home onLogoutClick = {handleLogoutClick} />}
     
    </>

    
}