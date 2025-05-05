console.log('Hello, App!')

// body

const body = new Body()
body.container = document.body

// LANDING
const landing = new Landing()
body.add(landing)
landing.addLandingLoginAnchor(function(){
    body.remove(landing)
    body.add(login)
})
landing.addLandingRegisterAnchor(function(){
    body.remove(landing)
    body.add(register)
})


//LOGIN
const login = new Login()
login.addAnchorListener(function(){
    body.remove(login)
    body.add(register)
})

login.addSubmitLoginListener(function(){
    home.loadUserName() // Orden a home de cargar usuario
    home.loadPosts() // Orden a home de cargar posts
    
    body.remove(login)
    body.add(home)
})

//REGISTER
const register = new Register()
//*1 MAIN SE ENCARGA DE QUITAR UNA PAGINA Y PONER OTRA, ES SU RESPONSABILIDAD
register.addLoginClickListener(function() {
    body.remove(register)
    body.add(login)
})
//*2
register.addRegisterSubmitListener(function(){
    body.remove(register)
    body.add(login)
})

//HOME
const home = new Home()
home.addHomeLogout(function(){
    body.remove(home)
    body.add(landing)
})

