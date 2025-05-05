import { useParams, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { Posts } from './Posts'
import { logic } from '../../logic/index.js'
import { toast } from 'react-toastify'

export const Profile = () => {
    const { username } = useParams()
    const location = useLocation()
    const [userId, setUserId] = useState(location.state?.userId || null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (userId) {
            setLoading(false)
            return
        }

        // Si no tenemos userId, buscamos al usuario por username
        logic.getUserIdByUsername(username)
            .then(id => {
                if (!id) {
                    setNotFound(true)
                } else {
                    setUserId(id)
                }
            })
            .catch(error => {
                console.error(error)
                toast.error(`❌ ${error.message}`)
                setNotFound(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [username])

    if (loading) return <p>Cargando perfil...</p>

    if (notFound) {
        return (
            <div>
                <h1>{username}</h1>
                <p>❌ El usuario "{username}" no existe.</p>
            </div>
        )
    }

    return (
        <div>
            <h1 className="username">{username}</h1>
            <Posts key={userId} targetUserId={userId} />
        </div>
    )
}










/*
export const Profile = () => {
    const { username } = useParams() // useParams devuelve un objeto con la propiedad username -- const username = useParams().username
    const { state: { userId }} = useLocation() // useLocation devuelve un objeto que tiene la propiedad state que tiene otro objeto con el valor de userId { state: { userId } }
                                                // const state = useLocation()
                                                // const userId = state.userId
    
     
    if (!userId) {
        return (
            <div>
                <h1>{username}</h1>
                <p>❌ El usuario "{username}" no existe.</p>
            </div>
        )
    }

    return <div>
        <h1 className="username">{username}</h1>

        <Posts key={userId || 'default' } targetUserId={userId} />
    </div>
}
    */