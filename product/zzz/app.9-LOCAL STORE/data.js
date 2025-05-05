const data = {
    uuid(){ // Funcion para generar id aleatorias y assignarlas cuando se registre un usuario.
        return (Date.now() + Math.random()).toString(36).replace('.', '') 
    },

    // obtener los usuarios de la local store
    get users(){
        // con .parse genero un objeto con los datos de la localStorage.users para trabajar con él, si no hay nada devuelvo un array vacio
        const users = JSON.parse(localStorage.users || '[]')

        return users
    },
    set users(users){
        // con .stringify genero una string para poder enviar a la local storage los users
        // JSON = JAVASCRIPT OBJECT NOTATION
        const json = JSON.stringify(users)

        // lo guardo en el apartado users de la localstor
        localStorage.users = json
    },

    get userId(){
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },

    set userId(id){
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },
    
    get posts(){
        const posts = JSON.parse(localStorage.posts || '[]')

        return posts
    },
    set posts(posts){
        const json = JSON.stringify(posts)

        localStorage.posts = json
    }
}