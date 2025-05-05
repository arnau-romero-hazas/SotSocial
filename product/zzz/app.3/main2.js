console.clear()
console.log('Hello, App!')

// =========================================================LANDING=====================================================================================

function Component(container) { //Funcion Constructora que crea componentes.container
    this.container = container
}

//CREAR EL DIV DE LANDIG CON FUNCION CONSTRUCTORA
    var landing = new Component(document.createElement('div')) // Declaramos landing, hacemos new Component para llamar a la funcion constructora y le pasamos el parametro (document.createElement('div')) para cear un elemento div en landing.container

    landing.mount = function () {
 
        document.body.appendChild(this.container) // Asigno la div landing a body (ahora landing es hijo de body). El parametro this apuntara a Landing.container.mount.
       
        //ESTILOS PARA LANDING
        // container.style.backgroundColor = '#E0EEEC'
        // container.style.fontFamily = 'verdana'
        
        var logo = document.createElement('h1') // Creo elemento cabecera Landinglogo.
        logo.textContent = 'Logo'
        this.container.appendChild(logo) //Asigno el LandingLogo al landing (ahora landingLogo es el hijo de landing).

        var registerAnchor = document.createElement('a') //Creo elemento anchor para registro.
        registerAnchor.textContent = 'Register'
        registerAnchor.addEventListener('click', function () {
            document.body.removeChild(this.container) 
            document.body.appendChild(register.container)
        }.bind(this)) // Hay que añadir el .bind(this), para apuntar a this.container(landing.container) que es lo que queremos que se remueva, 
        //si no ponemos esto a lo que apuntariamos seria registerAnchor.addEvenlistener.container que no es lo que queremos remover(tampoco existe),
        //  ya que al ser una funcion con el this. apuntariamos a la variable de esta, haciendo esto le decimos que apunte al this de la funcion de fuera(landing.mount)

        this.container.appendChild(registerAnchor) // Assigno elemento landingRegisterAnchor a landing.

        var orText = document.createTextNode(' or ')
        this.container.appendChild(orText)

        var loginAnchor = document.createElement('a') //Creo elemento anchor landingLogin 
        loginAnchor.textContent = 'Login'
        loginAnchor.addEventListener('click', function () {
            document.body.removeChild(this.container)
            document.body.appendChild(login.container)
        }.bind(this))
        this.container.appendChild(loginAnchor)  // Asigno este elemento a landing (landingLoginAnchor sera hijo de landing)

        
    }   

// ============================================================REGISTER============================================================================================================

var register = new Component(document.createElement('div'))
    register.mount = function (){
       
        //ESTILOS PARA REGISTER
        // container.style.backgroundColor = '#E0EEEC'
        // container.style.fontFamily = 'verdana'

        // HEADER PARA REGISSTER
        var logo = document.createElement('h1') // Creo el elemento register logo
        logo.textContent = 'Logo'
        this.container.appendChild(logo) // Assigno el elemento registerLogo a register 

        // FORMULARIO REGISTRO
        var form = document.createElement('form'); // Creo el formulario register form
        this.container.appendChild(form) // Assigno el registerForm al div register (ahora registerForm es hijo de register)
        
        // PONGO ESTILOS AL FORMULARIO PARA QUE SE ALINEEN VERTICALMENTE
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.gap = '15px'

        //CREAR ETIQUETA PARA LA CAJITA NAME
        var formNameLabel = document.createElement('label') // Creo la etiqueta para name
        formNameLabel.textContent = 'Name: '
        form.appendChild(formNameLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

        // CREAR LA CAJITA INPUT PARA INGRESAR NAME
        var inputNombre = document.createElement('input') // Creo una cajita para ingresar el nombre
        form.appendChild(inputNombre) // Assigno esta cajita a register form

        //CREAR ETIQUETA PARA LA CAJITA SURNAME
        var formSurnameLabel = document.createElement('label') // Creo la etiqueta para surName
        formSurnameLabel.textContent = 'Surname'

        form.appendChild(formSurnameLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

        // CREAR LA CAJITA INPUT PARA INGRESAR SURNAME
        var inputApellido = document.createElement('input') // Creo una cajita para ingresar el apellido
        form.appendChild(inputApellido) // Assigno esta cajita a register form

        //CREAR ETIQUETA PARA LA CAJITA EMAIL
        var registerFormEmailLabel = document.createElement('label') // Creo la etiqueta para surName
        registerFormEmailLabel.textContent = 'Email'
        form.appendChild(registerFormEmailLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

        // CREAR LA CAJITA INPUT PARA INGRESAR EMAIL
        var inputEmail = document.createElement('input') // Creo una cajita para ingresar el apellido
        form.appendChild(inputEmail) // Assigno esta cajita a register form

        //CREAR ETIQUETA PARA LA CAJITA USERNAME
        var registerFormUsernameLabel = document.createElement('label') // Creo la etiqueta para surName
        registerFormUsernameLabel.textContent = 'Username: '
        form.appendChild(registerFormUsernameLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)
     
        // CREAR LA CAJITA INPUT PARA INGRESAR USERNAME
        var inputUsername = document.createElement('input') // Creo una cajita para ingresar el apellido
        form.appendChild(inputUsername) // Assigno esta cajita a register form

        //CREAR ETIQUETA PARA LA CAJITA PASSWORD
        var registerFormPasswordLabel = document.createElement('label') // Creo la etiqueta para surName
        registerFormPasswordLabel.textContent = 'Password' 
        form.appendChild(registerFormPasswordLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

        // CREAR LA CAJITA INPUT PARA INGRESAR PASSWORD
        var inputPassword = document.createElement('input') // Creo una cajita para ingresar el apellido
        form.appendChild(inputPassword) // Assigno esta cajita a register form

        // CREO ELEMENTO LOGGINANCHOR PARA REGISTER
        var logginAnchor2 = document.createElement('a')
        logginAnchor2.textContent = 'Login'
        this.container.appendChild(logginAnchor2)

        logginAnchor2.addEventListener('click', function () {
            document.body.removeChild(this.container)
            document.body.appendChild(home.container)
        }.bind(this))

        // CREAR BOTON ENVIO REGISTER

        var botonEnviar = document.createElement('button');
        botonEnviar.textContent = "Register";
        form.appendChild(botonEnviar)

        
    }

//================================================================LOGIN=====================================================================================

    var login = new Component(document.createElement('div'))
    login.mount = function(){
        
        //document.body.appendChild(login)
        // PONGO ESTILOS AL FORMULARIO PARA QUE SE ALINEEN VERTICALMENTE
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.gap = '15px'

        var header = document.createElement('h1') //header login
        header.textContent = 'Login'
        this.container.appendChild(header)

        // var loginHeaderText = document.createTextNode('Login') //texto para el header
        // loginHeader.appendChild(loginHeaderText)
       

        var label = document.createElement('label') //etiqueta para username
        this.container.appendChild(label)

        // var labelText = document.createTextNode('Username ') // texto para la etiqueta
        // label.appendChild(labelText)
        label.textContent = 'Username'
        var labelInput = document.createElement('input')
        this.container.appendChild(labelInput)

        var labelPassword = document.createElement('label')
        this.container.appendChild(labelPassword)

        // var loginLabelPassword2Text = document.createTextNode('Password ')
        // labelPassword.appendChild(loginLabelPassword2Text)
        labelPassword.textContent = 'Password '

        var labelInputPassword = document.createElement('input')
        this.container.appendChild(labelInputPassword)
        
        // Anchor para que te lleve a register
        var anchorRegister = document.createElement('a')
        anchorRegister.textContent = 'Register' 
        anchorRegister.addEventListener('click', function () {
            document.body.removeChild(this.container)
            document.body.appendChild(register.container)
        }.bind(this))
        this.container.appendChild(anchorRegister)

        // Butoon para que haga login
        var loginButton = document.createElement('button')
        loginButton.textContent = "Login"
        loginButton.addEventListener('click', function () {
            document.body.removeChild(this.container)
            document.body.appendChild(home.container)
        }.bind(this))
        this.container.appendChild(loginButton)

    }
        //==================================================================HOME=================================================================================0
   
        var home = new Component(document.createElement('div'))
        home.mount = function(){

        var header = document.createElement('h1')
        this.container.appendChild(header)

        header.style.width = '100%'
        header.style.height = '50px'
        header.style.margin = '10px'
        header.style.display = 'flex'
        header.style.justifyContent = 'space-between'
        header.style.alignItems = 'center'
        header.innerText= 'home'

        var logoutButton = document.createElement('button')
        logoutButton.innerText = 'Log Out'
        logoutButton.style.width = '100px'
        logoutButton.style.height = '35px'
        logoutButton.style.marginRight = '10px'
        logoutButton.addEventListener('click',function(){
            document.body.removeChild(this.container)

            document.body.appendChild(landing.container) 
        }.bind(this))
        this.container.appendChild(logoutButton)

        // var main = document.createElement('main')
        // home.main = main

        var posts = document.createElement('article')
        posts.style.display = 'flex'
        posts.style.width = '100%'
        posts.style.maxWidth = 'inherit'
        posts.style.flexDirection = 'column'
        posts.style.gap = '10px'
        this.container.appendChild(posts)

        var calsotsPost = document.createElement('img')
        calsotsPost.src = 'https://www.oliveradatenea.com/wp-content/uploads/2024/01/Calcots-con-Airfryer-1.jpg'
        calsotsPost.style.width = '10%'
        calsotsPost.style.height = '10%'
        posts.appendChild(calsotsPost)

        var calsotsEmojis = document.createElement('span')
        calsotsEmojis.style.display = 'flex'
        calsotsEmojis.style.justifyContent = 'left'
        calsotsEmojis.style.gap = '5px'
        calsotsPost.appendChild(calsotsEmojis)

        var likeEmoji = document.createElement('a')
        likeEmoji.innerText = '❤️'
        calsotsEmojis.appendChild(likeEmoji)

        var commentEmoji = document.createElement('a')
        commentEmoji.innerText = '📃'
        calsotsEmojis.appendChild(commentEmoji)

        var comment = document.createElement('Text')
        comment.style.opacity = '60%'
        comment.style.color = 'black'
        calsotsEmojis.appendChild(comment)

        comment.textContent = 'Comment...'
       
        // var bananaPost = document.createElement('img')
        // bananaPost.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVh4eUU6jtRS9zzlomMGLvWgpua5Xj5IcoQ&s'
        // bananaPost.style.width = '100%'
        // bananaPost.style.height = 'auto'
        // posts.appendChild(bananaPost)

        // var nanaMojis = document.createElement('span')
        // nanaMojis.style.display = 'flex'
        // nanaMojis.style.justifyContent = 'left'
        // nanaMojis.style.gap = '5px'
        // posts.appendChild(nanaMojis)

        // var likeEmoji = document.createElement('a')
        // likeEmoji.innerText = '❤️'
        // nanaMojis.appendChild(likeEmoji)

        // var commentEmoji = document.createElement('a')
        // commentEmoji.innerText = '📃'
        // nanaMojis.appendChild(commentEmoji)

        // var comment = document.createElement('Text')
        // comment.style.opacity = '60%'
        // comment.style.color = 'black'
        // nanaMojis.appendChild(comment)

        // var commentText = document.createTextNode('Comment...')
        // comment.appendChild(commentText)
    }

landing.mount()
register.mount()
login.mount()
home.mount()
//=========================================================================MAIN========================================================================================================

