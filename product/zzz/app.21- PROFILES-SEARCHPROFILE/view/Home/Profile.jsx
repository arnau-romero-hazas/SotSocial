import { useParams, useLocation} from 'react-router'

import { Posts } from './Posts'

export const Profile = () => {
    const { username } = useParams() // useParams devuelve un objeto con la propiedad username -- const username = useParams().username
    const { state: { userId }} = useLocation() // useLocation devuelve un objeto que tiene la propiedad state que tiene otro objeto con el valor de userId { state: { userId } }
                                                // const state = useLocation()
                                                // const userId = state.userId

    return <div>
        <h1 className="username">{username}</h1>

        <Posts key={userId || 'default' } targetUserId={userId} />
    </div>
}