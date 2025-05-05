import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate} from 'react-router'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify' // Importamos Toastify
import 'react-toastify/dist/ReactToastify.css' // Importamos los estilos

function App(){
    // Estado inicial del useState en landing.
    const [view, setView] = useState('landing')
    const [loggedIn, setLoggedIn] = useState(null)

    const navigate = useNavigate()

    // useEffect para que, si el usuario está logueado, lo mantenga en Home al refrescar la página.
    useEffect(() => {
        try {
            // Llamamos a la función que nos dice si el usuario está logueado
            const loggedIn = logic.isUserLoggedIn()

            // Si está logueado, montamos la vista Home
            setLoggedIn(loggedIn)
        } catch (error) {
            console.error(error)
            toast.error(`❌ ${error.message}`) // Mostramos el error con Toastify en lugar de alert()
        }
    }, []) 

    useEffect(() => {
        switch (view) {
            case 'landing':
                navigate('/landing')
                break
            case 'register':
                navigate('/register')
                break
            case 'login':
                navigate('/login')
                break
            case 'home':
                navigate('/')
                break
        }
    }, [view])

    // Manejo de navegación entre vistas
    const handleRegisterClick = () => setView('register')
    const handleLoginClick = () => setView('login')
    const handleRegisterSubmit = () => setView('login')
    const handleLoginSubmit = () => {
        setLoggedIn(true)
        setView('home')
    }
    const handleLogoutClick = () => { 
        setLoggedIn(false)
        setView('login')
    }

    console.debug('App -> render')

    return (
        <>
            {/* ToastContainer para gestionar las notificaciones */}
            <ToastContainer position="top-right" autoClose={2000} />
            <Toaster /> {/* Esto habilita los toasts en toda la app */}
            {loggedIn !== null && <Routes>

                <Route path="/landing" element= {loggedIn ? <Navigate to="/" /> : <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />} />
                
                <Route path="/register" element= {loggedIn ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />} />
                
                <Route path="/login" element= {loggedIn ? <Navigate to="/" /> :<Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />} />
                
                <Route path="/" element= {loggedIn ? <Home onLogoutClick={handleLogoutClick} /> : <Navigate to="/login" />} />
            </Routes>}   
        </>
    )
}

export default App