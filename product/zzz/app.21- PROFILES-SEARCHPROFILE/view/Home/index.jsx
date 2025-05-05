import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation} from 'react-router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'
import { Profile } from './Profile.jsx'
import { Search } from './Search.jsx'

import { logic } from '../../logic/index.js'

export function Home({ onUserLoggedOut}) {
    const[username, setUsername] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()

    // Funcion flecha para generar el saludo al entrar en home
    useEffect(() => {
        console.debug('Home -> useEffect')

        try{
           logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ ${error.message}`)
                })
                
        }catch(error){
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }, [])

    // funcion para cuando le demos click a logout
    const handleLogoutClick = () => {
        try{
            logic.logoutUser()

            onUserLoggedOut()

            toast.success('Bye, See You soon!!')
        } catch(error) {
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }

    // Funcion cuando hagamos click en el boton de crear post.
    const handleAddPostClick = () => navigate('/create-post')

    // Funcion cuando hagamos submit en el form de create-post

    const handlePostCreated = () => navigate('/')
   
    const handlePostCreateCancelled = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleSearchClick = () => navigate('/search')

    const handleUserClick = () => {
        try{
            const userId = logic.getUserId()

            navigate(`/${username}`, { state: { userId } })
        } catch(error){
            console.error(error)

            toast.error(error.message)
        }

    }

    console.debug('Index -> render')

    return <div className='Home'>
        <header>
            <h1 onClick={handleHomeClick}>HOME</h1>

            <h2 onClick={handleUserClick}>Hello, {username}!</h2>

            {pathname === '/' && <button onClick={handleSearchClick}>🔍</button>}

            <button type = "button" onClick={handleLogoutClick}>Logout</button>
        </header>
        
        <main>
           <Routes>
               <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onPostCreateCancelled={handlePostCreateCancelled} />} />
               <Route path="/search" element={<Search />} />
               <Route path="/:username" element={<Profile />} />
               <Route path="/" element={<Posts />} />
           </Routes>
        </main>

    <footer>
        {pathname === '/' && <button onClick={handleAddPostClick}>ADD A POST !</button>}
    </footer>
    
    </div>     
}