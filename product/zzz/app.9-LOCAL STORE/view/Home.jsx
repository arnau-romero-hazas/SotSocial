const { useState, useEffect } = React

function Home({ onLogoutClick }) {
    const[view, setView] = useState('posts')
    const[userName, setUserName] = useState('')
    const [posts, setPosts] = useState([])
    // TODO add state for posts

    // Funcion flecha para generar el saludo al entrar en home
    useEffect(() => {
        console.debug('Index -> useEffect')

        try{
            // lamamos a la logica de obtener el nombre y la guardamos en la variable name.
            const name = logic.getUserName()
            // llamamos a la logica para obtener los posts
            const posts = logic.getPosts()

            //llamamos a setUserName declarado en la línea 5 para cambiar el useState a la nueva variable name.
            setUserName(name)
            // lo mismo con posts
            setPosts(posts)

        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }, [])

    // funcion para cuando le demos click a logout
    const handleLogoutClick = () => {
        try{
            logic.logoutUser()

            onLogoutClick()
        } catch(error) {
            console.error(error)

            alert(error.message)
        }
    }

    // Funcion cuando hagamos click en el boton de crear post.
    const handleAddPostClick = () => setView('create-post')

    // Funcion cuando hagamos submit en el form de create-post

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try{
            const { target: form} = event

            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)

            const posts = logic.getPosts()

            setPosts(posts)
            setView('posts')
        }catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleLikePostClick = postId => {
        try{
            logic.toggleLikePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Index -> render')

    return <div>
        <header>
            <h1>HOME</h1>

            <h2>Hello, {userName}!</h2>

            <button type = "button" onClick={handleLogoutClick}>Logout</button>
        </header>
        
        <main>
            {view === 'posts' && <section>
                {posts.map(post => 
                <article className="post">
                <h3> {post.author} </h3>

                <img src = {post.image} />
                <p>{post.text}</p>
                <div className="post-footer">
                <time>{post.createdAt.toISOString()}</time>

                <button onClick={() => handleToggleLikePostClick(post.id)} > {`${post.liked ? '❤️':'🤍'} (${post.likesCount})`}</button>
                </div>
                </article>)}
                
            </section>}

            {view === 'create-post' && <section>
                <form onSubmit = {handleCreatePostSubmit}>
                    <label htmlFor="image">Image</label>
                    <input type="url" id="image" />

                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" />

                    <button type="submit">Create</button>    
                </form>
                <a>Cancel</a> 
            </section>}
        </main>

    <footer>
        {view === 'posts' && <button onClick={handleAddPostClick}>ADD A POST !</button>}
    </footer>
    
    </div>     
}