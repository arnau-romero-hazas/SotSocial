import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { searchUsers } from '../../logic/searchUsers.js'; // Importa la función de búsqueda
import { logic } from '../../logic/index.js'

import './Search.css'

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams() // Usamos el hook de React Router para leer y modificar los parámetros de la URL, searchParams te permite acceder a los parametros, setSearchParams te permite actualizarlos
    const navigate = useNavigate()
    const [query, setQuery] = useState('') // Hook de React para almacenar en estado local el texto que el usuario esrcibe en el campo de búsqeuda (`query`)
    const [suggestions, setSuggestions] = useState([]) // Para guardar el array de sugerencias de usuarios que coincidan con lo que el usuario haya escrito
    
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]) // Limpiar sugerencias si la búsqueda está vacía o solo contiene espacios
            return // y salimos del useEffect
        }

        const timeout = setTimeout(() => {
            searchUsers(query) // Llamada a la lógica para obtener sugerencias pasandole el query
                .then(setSuggestions) // Guardamos las sugerencias que nos lleguen de la logica
                .catch((error) => { // Capturamos errores
                    console.error(error)
                    toast.error('No encontramos al usuario 😔')
                })
        }, 300) // Espera 300ms después del último cambio (para evitar muchas peticiones)

        return () => clearTimeout(timeout) //  Si el `query` cambia antes de que pasen los 300ms, cancelamos el timeout anterior para evitar que se lancen varias peticiones antiguas.
    }, [query]) // Ejecutamos el useEffect cada vez que el valor de `query` cambie

    const handleSearch = (event) => {
        event.preventDefault()

        // Accedemos al input del formulario con el nombre query y capturamos el valor
        const form = event.target
        const query = form.query.value

        // Si el input está vacío, lanzamos un error y cancelamos la busqueda
        if (!query.trim()) {
            toast.error('Search query cannot be empty')
            return
        }

        // Actualizamos la URL con el nuevo parámetro q.
        setSearchParams({ q: query })

        try {
            const userId = logic.getUserId()
            navigate(`/${query}`, { state: { userId } }) // Navegamos a la ruta y pasamos el userId por state
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    };

    return (
        <>
            <h1>Search Users</h1>

            <form onSubmit={handleSearch}> {/* Al hacer submit activamos el handleSearch*/}
                <input
                    type="text" // Campo de texto estándar
                    name="query" // ** Permiten identificar el campo, útil para formularios y estilos
                    id="query" // **
                    value={query} // Vinculamos el valor del camo al estádo query
                    onChange={(e) => setQuery(e.target.value)} // Actualiza el estado del query cada vez que el usuario escriba algo
                    autoComplete="off" // Desactivamos las sugerencias automáticas del navegador
                    placeholder="Buscar usuario"
                />
                <button type="submit">Search</button>
            </form>

            <ul className="suggestions">
                {suggestions.map((user) => (<li key={user.id} onClick={() => {  // Al hacer click
                                                        setQuery('') // Limpiamos el input
                                                        setSuggestions([]) // Limpiamos las sugerencias 
                                                        navigate(`/${user.username}`, { state: { userId: user.id } }) // Navegamos y pasamos el ID
                                                    }}
                                            >
                                                {user.username} {/* Mostramos el usuario a sugerir*/}
                                            </li>
                                            ))}
            </ul>
        </>
    );
};




/*
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Routes, Route, useNavigate, useLocation} from 'react-router'
import { toast } from "react-hot-toast";
import { logic } from '../../logic/index.js';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
   
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([])
            return
        }
    
        const timeout = setTimeout(() => {
            logic.searchUsers(query)
                .then(setSuggestions)
                .catch(error => {
                    console.error(error)
                    toast.error("No se pudieron cargar sugerencias")
                })
        }, 300) // espera 300ms después del último cambio (evita spam de peticiones)
    
        return () => clearTimeout(timeout) // limpia el timeout si el input cambia
    }, [query])

   
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
        <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            placeholder="Buscar usuario"
        />
        <button type="submit">Search</button>
    </form>

    <ul className="suggestions">
        {suggestions.map(user => (
            <li key={user.id} onClick={() => navigate(`/${user.username}`)}>
            {user.username}
            </li>
        ))}
    </ul>
    </>
}
*/