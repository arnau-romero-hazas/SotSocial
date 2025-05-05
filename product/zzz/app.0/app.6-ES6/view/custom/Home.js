class Home extends Component{
    constructor(){
        super('div')

        //GENERO EL CABECERO
        const header = new Headers(1)
        header.setText('HOME')
        this.add(header)

        // WELCOME 
        const welcome = new Headers(2)
        welcome.setText('Hello, World!')
        this.add(welcome)
        this.welcome = welcome

        //BOTON LOG OUT
        const logOutButton = new Button()
        logOutButton.setText('LOGOUT')
        logOutButton.addClickListener(function(){
            try{
                logic.logoutUser()
                this.logOutButton()
                
            }catch(error){
                console.log(error)
                alert(error.message)
            }
        }.bind(this))
        this.add(logOutButton) 

        // GENERO SECTIONS PARA INSERTAR LOS POSTS
        const postsSection = new Section()
        this.add(postsSection)
        this.postsSection = postsSection

        // BOTON PARA IR A GENERAR POSTS
        const addPostButton = new Button()
        addPostButton.setText('+')
        addPostButton.addClickListener(function(){
            const createPost = new CreatePost()

            createPost.addCreatePostSubmitListener(function(){
                this.remove(createPost)

                this.loadPosts()
                this.add(logOutButton)
                this.add(postsSection)
                this.add(addPostButton)

            }.bind(this))

            createPost.addCancelClickListener(function(){
                this.remove(createPost)
                this.add(logOutButton)
                this.add(postsSection)
                this.add(addPostButton)  
            }.bind(this))
            this.remove(postsSection)
            this.remove(addPostButton)
            this.remove(logOutButton)
            this.add(createPost)
        }.bind(this))
        this.add(addPostButton)
        //TODO GENERAR UN BOTON '+' PARA QUE TE APAREZCA UN FORMULARIO QUE TE DE LA OPCION A GENERAR UN POST MAS.

    }

    addHomeLogout(listener){
        this.logOutButton = listener
    }


    loadUserName(){
        // mensaje para dar la bienvenida al loguearse con el nombre del usuario
        try {
            const name = logic.getUserName()

            this.welcome.setText(`Hello, ${name}!`) // ponemos en home.welcome la funcion setText que heredamos de componentes 
            
        }catch(error){
            console.log(error)

            alert(error.message)
        }
        
    }

    loadPosts(){
        //TODO Funcion para generar posts iterando por el data.posts
        this.postsSection.container.innerHTML = '' // Limpiamos en container de postsSection para que cuando creemos una post nueva, no salgan repetidas las posts antiguas.
        try{
            const posts = logic.getPosts()

            for (let i =  posts.length - 1; i > -1  ; i--){ // Cogera cada post de data y lo metera dentrro de postSection, empezamos contando desde el final al principio para que el ultimo post subido se visualice el primero, como el mas reciente publicado arriba
            // Obtenemos cada post
            const post = posts[i]
            // Creamos un Article par acada post.
            const postArticle = new Article()
            // Cabecero para ID de usuario
            const authorHeading = new Headers(3)
            authorHeading.setText(post.author)
            postArticle.add(authorHeading)
            // Imagen para el post
            const postImage = new Image()
            postImage.setUrl(post.image) // Le damos la propiedad src.(url) a la funcion
            postArticle.add(postImage)

            // Elemento Paragraph para añadir texto al post
            const postText = new Paragraph()
            postText.setText(post.text)
            postArticle.add(postText)
            
            // Fecha de creacion de post
            const postDate = new Time()
            postDate.setText(post.createdAt.toISOString()) //La fecha es un objeto así que lo convertimsoa  string
            postArticle.add(postDate)
            
            // Boton de like
            const likeButton = new Button()
            likeButton.setText(post.liked? '❤️' : '🤍')
            likeButton.addClickListener(function(){
                try{
                    logic.toggleLikePost(post.id)
                    this.loadPosts()

                }catch(error){
                    console.log(error)

                    alert(error.message)
                }
            }.bind(this))
            postArticle.add(likeButton)

            // Lo hacemos hijo de postSection
            this.postsSection.add(postArticle)
        }

        }catch(error){
            console.log(error)

            alert(error.message)
        }

    }
}