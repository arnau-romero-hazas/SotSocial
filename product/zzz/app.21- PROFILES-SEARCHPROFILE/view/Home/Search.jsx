import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Routes, Route, useNavigate, useLocation} from 'react-router'
import { toast } from "react-hot-toast";
import { logic } from '../../logic/index.js';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const handleSearch = event => {
        event.preventDefault()

        const form = event.target
        const query = form.query.value

        if (!query.trim()) {
            toast.error("Search query cannot be empty")
            return
        }

        setSearchParams({ q: query })

        try {
            const userId = logic.getUserId()
            navigate(`/${query}`, { state: { userId } }) // Ahora solo se ejecuta tras la búsqueda
        } catch(error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return <>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
            <input type="text" name="query" id="query" defaultValue={searchParams.get('q')} />
            <button type="submit">Search</button>
        </form>
    </>
}
