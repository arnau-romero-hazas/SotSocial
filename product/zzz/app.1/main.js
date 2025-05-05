console.clear()
console.log('Hello, App!')

// =========================================================LANDING=====================================================================================

//CREAR EL DIV DE LOGO
var landing = document.createElement('div') //Creo div landing.
document.body.appendChild(landing) // Asigno la div landing a body (ahora landing es hijo de body).
landing.style.backgroundColor = '#E0EEEC'
landing.style.fontFamily = 'verdana'
var landingLogo = document.createElement('h1') // Creo elemento cabecera Landinglogo.
landing.appendChild(landingLogo) //Asigno el LandingLogo al landing (ahora landingLogo es el hijo de landing).

var landingLogoText = document.createTextNode('Logo') // Creo el elemento de texto landingLogoText .
landingLogo.appendChild(landingLogoText) //Assigno el elemento de texto landingLogoText a landingLogo (Ahora landingLogoText es hijo de landingLogo)

var landingRegisterAnchor = document.createElement('a') //Creo elemento anchor para registro.
landing.appendChild(landingRegisterAnchor) // Assigno elemento landingRegisterAnchor a landing.

// FUNCION PARA QUE EL ANCHOR REGISTER TE LLEVE  A LA PANTALLA REGISTER:

landingRegisterAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(register)
})


var landingRegisterText = document.createTextNode('Register') //Creo elemento de texto para landingRegisterAnchor
landingRegisterAnchor.appendChild(landingRegisterText) // Lo assigno (ahora landingRegisterText es hijo de landingRegisterAnchor)

var landingOrText = document.createTextNode(' or ') //Creo elemento de texto or
landing.appendChild(landingOrText) //Lo asigno a landing (el elemento landingOrText es hijo de landing)

var landingLoginAnchor = document.createElement('a') //Creo elemento anchor landingLogin 
landing.appendChild(landingLoginAnchor)  // Asigno este elemento a landing (landingLoginAnchor sera hijo de landing)

// FUNCION PARA QUE EL ANCHOR LOGIN TE LLEVE  A LA PANTALLA LOGIN:

landingLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(login)
})

var landingLoginText = document.createTextNode('Login')
landingLoginAnchor.appendChild(landingLoginText)


// ============================================================REGISTER============================================================================================================

var register = document.createElement('div') // Creo div register
//document.body.appendChild(register) // Asigno la div register a body (ahora register es hijo de body)
register.style.backgroundColor = '#E0EEEC'
registerstyle.fontFamily = 'verdana'
var registerLogo = document.createElement('h1') // Creo el elemento register logo
register.appendChild(registerLogo) // Assigno el elemento registerLogo a register 

var registerLogoText = document.createTextNode('Register') // Creo texto registerLogoText
registerLogo.appendChild(registerLogoText) // Assigno registerLogoText a RegisterLogo

// // FORMULARIO REGISTRO
var login = document.createElement('form'); // Creo el formulario register form
register.appendChild(login) // Assigno el registerForm al div register (ahora registerForm es hijo de register)
// PONGO ESTILOS AL FORMULARIO PARA QUE SE ALINEEN VERTICALMENTE
login.style.display = "flex";
login.style.flexDirection = "column";
login.style.gap = '15px'

//CREAR ETIQUETA PARA LA CAJITA NAME
var registerFormNameLabel = document.createElement('label') // Creo la etiqueta para name
login.appendChild(registerFormNameLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

var registerFormNameLabelText = document.createTextNode('Name: ') // Creo el texto para etiqueta name
registerFormNameLabel.appendChild(registerFormNameLabelText) // Assigno el texto para la etiqueta (ahora registerFormNameLabelText es hijo de registerFormLabel)

// CREAR LA CAJITA INPUT PARA INGRESAR NAME
var inputNombre = document.createElement('input') // Creo una cajita para ingresar el nombre
login.appendChild(inputNombre) // Assigno esta cajita a register form

//CREAR ETIQUETA PARA LA CAJITA SURNAME
var registerFormSurnameLabel = document.createElement('label') // Creo la etiqueta para surName
login.appendChild(registerFormSurnameLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

var registerFormSurnameLabelText = document.createTextNode('Surname: ') // Creo el texto para etiqueta surName
registerFormSurnameLabel.appendChild(registerFormSurnameLabelText) // Assigno el texto para la etiqueta (ahora registerFormNameLabelText es hijo de

// CREAR LA CAJITA INPUT PARA INGRESAR SURNAME
var inputApellido = document.createElement('input') // Creo una cajita para ingresar el apellido
login.appendChild(inputApellido) // Assigno esta cajita a register form

//CREAR ETIQUETA PARA LA CAJITA EMAIL
var registerFormEmailLabel = document.createElement('label') // Creo la etiqueta para surName
login.appendChild(registerFormEmailLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

var registerFormEmailLabelText = document.createTextNode('Email: ') // Creo el texto para etiqueta surName
registerFormEmailLabel.appendChild(registerFormEmailLabelText) // Assigno el texto para la etiqueta (ahora registerFormNameLabelText es hijo de

// CREAR LA CAJITA INPUT PARA INGRESAR EMAIL
var inputEmail = document.createElement('input') // Creo una cajita para ingresar el apellido
login.appendChild(inputEmail) // Assigno esta cajita a register form

//CREAR ETIQUETA PARA LA CAJITA USERNAME
var registerFormUsernameLabel = document.createElement('label') // Creo la etiqueta para surName
login.appendChild(registerFormUsernameLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

var registerFormUsernameLabelText = document.createTextNode('Username: ') // Creo el texto para etiqueta surName
registerFormUsernameLabel.appendChild(registerFormUsernameLabelText) // Assigno el texto para la etiqueta (ahora registerFormNameLabelText es hijo de

// CREAR LA CAJITA INPUT PARA INGRESAR USERNAME
var inputUsername = document.createElement('input') // Creo una cajita para ingresar el apellido
login.appendChild(inputUsername) // Assigno esta cajita a register form

//CREAR ETIQUETA PARA LA CAJITA PASSWORD
var registerFormPasswordLabel = document.createElement('label') // Creo la etiqueta para surName
login.appendChild(registerFormPasswordLabel) // Assigno esta etiqueta a registerForm (ahora label es hijo de registerForm)

var registerFormPasswordLabelText = document.createTextNode('Password: ') // Creo el texto para etiqueta surName
registerFormPasswordLabel.appendChild(registerFormPasswordLabelText) // Assigno el texto para la etiqueta (ahora registerFormNameLabelText es hijo de

// CREAR LA CAJITA INPUT PARA INGRESAR PASSWORD
var inputPassword = document.createElement('input') // Creo una cajita para ingresar el apellido
login.appendChild(inputPassword) // Assigno esta cajita a register form

// CREO ELEMENTO LOGGINANCHOR PARA REGISTER
var logginAnchor2 = document.createElement('a')
register.appendChild(logginAnchor2)

logginAnchor2.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(home)
})

var logginAnchor2text = document.createTextNode('Login')
logginAnchor2.appendChild(logginAnchor2text)

// CREAR BOTON ENVIO REGISTER

var botonEnviar = document.createElement('button');
login.appendChild(botonEnviar)

botonEnviar.innerHTML = "Register";

//================================================================LOGIN=====================================================================================

var login = document.createElement('div') // div para login
//document.body.appendChild(login)
// PONGO ESTILOS AL FORMULARIO PARA QUE SE ALINEEN VERTICALMENTE
login.style.display = "flex";
login.style.flexDirection = "column";
login.style.gap = '15px'

var loginHeader = document.createElement('h1') //header login
login.appendChild(loginHeader)

var loginHeaderText = document.createTextNode('Login') //texto para el header
loginHeader.appendChild(loginHeaderText)

var loginLabel = document.createElement('label') //etiqueta para username
login.appendChild(loginLabel)

var loginLabelText = document.createTextNode('Username ') // texto para la etiqueta
loginLabel.appendChild(loginLabelText)

var loginlabelinput = document.createElement('input')
login.appendChild(loginlabelinput)

var loginLabelPassword2 = document.createElement('label')
login.appendChild(loginLabelPassword2)

var loginLabelPassword2Text = document.createTextNode('Password ')
loginLabelPassword2.appendChild(loginLabelPassword2Text)

var loginlabelinputPassword = document.createElement('input')
login.appendChild(loginlabelinputPassword)

var anchorLoginRegister = document.createElement('a')
login.appendChild(anchorLoginRegister)

// Boton para que register te lleve a register
anchorLoginRegister.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(register)
})


var anchorLoginRegisterText = document.createTextNode('Register')
anchorLoginRegister.appendChild(anchorLoginRegisterText)

var loginButton = document.createElement('button')
login.appendChild(loginButton)

loginButton.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(home)
})


loginButton.innerHTML = "Login";

//==================================================================HOME=================================================================================0

var home = document.createElement('div')

var headerHome = document.createElement('h1')
home.appendChild(headerHome)

headerHome.style.width = '100%'
headerHome.style.height = '50px'
headerHome.style.margin = '10px'
headerHome.style.display = 'flex'
headerHome.style.justifyContent = 'space-between'
headerHome.style.alignItems = 'center'

var headerHomeText = document.createTextNode('HOME')
headerHome.appendChild(headerHomeText)


var logoutButton = document.createElement('button')
logoutButton.style.width = '100px'
logoutButton.style.height = '35px'
logoutButton.style.marginRight = '10px'
home.appendChild(logoutButton)

var logoutButtonText = document.createTextNode('Logout')
logoutButton.appendChild(logoutButtonText)


logoutButton.addEventListener('click',function(){
    document.body.removeChild(home)

    document.body.appendChild(landing) 
})
home.appendChild(posts)
posts.style.display = 'flex'
posts.style.width = '100%'
posts.style.maxWidth = 'inherit'
posts.style.flexDirection = 'column'
posts.style.gap = '10px'

var kiwiPost = document.createElement('img')
kiwiPost.src = 'https://www.nutritionadvance.com/wp-content/uploads/2017/12/whole-kiwi-fruit-and-half-a-kiwi-showing-flesh.jpg'
kiwiPost.style.width = '100%'
kiwiPost.style.height = 'auto'
posts.appendChild(kiwiPost)

var kiwiMojis = document.createElement('span')
kiwiMojis.style.display = 'flex'
kiwiMojis.style.justifyContent = 'left'
kiwiMojis.style.gap = '5px'
posts.appendChild(kiwiMojis)

var likeEmoji = document.createElement('a')
likeEmoji.innerText = '❤️'
kiwiMojis.appendChild(likeEmoji)

var commentEmoji = document.createElement('a')
commentEmoji.innerText = '📃'
kiwiMojis.appendChild(commentEmoji)

var comment = document.createElement('Text')
comment.style.opacity = '60%'
comment.style.color = 'black'
kiwiMojis.appendChild(comment)

var commentText = document.createTextNode('Comment...')
comment.appendChild(commentText)

var bananaPost = document.createElement('img')
bananaPost.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVh4eUU6jtRS9zzlomMGLvWgpua5Xj5IcoQ&s'
bananaPost.style.width = '100%'
bananaPost.style.height = 'auto'
posts.appendChild(bananaPost)

var nanaMojis = document.createElement('span')
nanaMojis.style.display = 'flex'
nanaMojis.style.justifyContent = 'left'
nanaMojis.style.gap = '5px'
posts.appendChild(nanaMojis)

var likeEmoji = document.createElement('a')
likeEmoji.innerText = '❤️'
nanaMojis.appendChild(likeEmoji)

var commentEmoji = document.createElement('a')
commentEmoji.innerText = '📃'
nanaMojis.appendChild(commentEmoji)

var comment = document.createElement('Text')
comment.style.opacity = '60%'
comment.style.color = 'black'
nanaMojis.appendChild(comment)

var commentText = document.createTextNode('Comment...')
comment.appendChild(commentText)
//=========================================================================MAIN========================================================================================================

