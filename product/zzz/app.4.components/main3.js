//INGENERIA DE FUNCIONES CONSTRUCTORAS

// FUNCION PARA CREAR COMPONENTES
function Component(tagName){
    this.container = document.createElement(tagName)
}
// AL PROTOTYPE DE COMPONENTES LE AÑADO LA FUNCION .add QUE ES PARA HACER UN APPENCHILD 
Component.prototype.add = function(child){
    this.container.appendChild(child.container)
}

Component.prototype.setText = function(myText){
    this.container.textContent = myText
}
// FUNCION PARA CREAR DIV

function Div(){
    Component.call(this, 'div')
}

Div.prototype = Object.create(Component.prototype)
Div.prototype.constructor = Div

// FUNCION PARA CREAR FORMULARIOS
function Form(){
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype) // en el prototype de component creas un ocjeto que es el form.prototype
Form.prototype.constructor = Form // al form.prototype.constructor asignas el tipo form

Form.prototype.addSubmitListener = function(callback){
    this.container.addEventListener('submit', callback)
}
// FUNCION PARA CREAR INPUTS
function Input(){
    Component.call(this, 'input')

}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor =  Input

Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder
}

Input.prototype.getValue = function () {
    return this.container.value
}

// FUNCION PARA CREAR BOTONES

function Button(){
    Component.call(this, 'Button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor =  Button

Button.prototype.setType = function (type) {
    this.container.type = type
}

Button.prototype.setText = function (text) {
    this.container.textContent = text
}


// FUNCION PARA CREAR ANCHOR

function Anchor(){
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor =  Anchor

// FUNCION PARA CREAR HEADERS

function Headers(level){
    Component.call(this, 'h'+ level)
}

Headers.prototype = Object.create(Component.prototype)
Headers.prototype.constructor =  Headers

// FUNCION PARA CREAR LADERS

function Label(){
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label

// FUNCION PARA CREAR ARTICLE

function Article(){
    Component.call(this, 'article')
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article

// FUNCION PARA CREAR IMAGENES

function Imagen(){
    Component.call(this, 'img')
}

Imagen.prototype = Object.create(Component.prototype)
Imagen.prototype.constructor = Imagen

// FUNCION PARA CREAR SPAN

function Span(){
    Component.call(this, 'span')
}

Span.prototype = Object.create(Component.prototype)
Span.prototype.constructor = Span

// FUNCION PARA CREAR TEXTOS

function Text(myText){
    document.createTextNode(myText)
}

// Text.prototype = Object.create(Component.prototype)
// Text.prototype.constructor = Text


// FUNCION PARA CREAR BODY
function Body() {
    Component.call(this, 'body')
}

Body.prototype = Object.create(Component.prototype)
Body.prototype.constructor = Body

// body

const body = new Body()
document.body = body.container

// CUERPO DEL PROGRAMA

// LANDING

function Landing(){
    // CREO UN DIV PARA LANDING 
    Div.call(this)
   
    var header = new Headers(1)
    header.setText('LANDING')
    this.add(header)

    // CREO ANCHOR PARA REGISTER
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    registerAnchor.container.addEventListener('click',function(){
        document.body.removeChild(this.container)
        body.add(register)
    }.bind(this))
    this.add(registerAnchor)
    
    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)
    // // CREO TEXTO OR
    // var orText = Text.call('or')
    // this.add(orText)


    // CREO ANCHOR PARA LOGIN
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    loginAnchor.container.addEventListener('click',function(){
        document.body.removeChild(this.container)
        body.add(login)
    }.bind(this))
    this.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

var landing = new Landing()
body.add(landing)

// REGISTER

function Register(){
    // CREO UN DIV
    Div.call(this)

    // HEADER REGISTER
    var header = new Headers(1)
    header.setText('REGISTER')
    this.add(header)

    // CREO FORM Y LO HAGO HIJO DE REGISTER.CONTAINER
    var form = new Form()
    form.addSubmitListener(function(event){
        event.preventDefault()

        console.log('register submit')

        var name = nameInput.getValue()
        var surname = userNameInput.getValue()
        var email = emailInput.getValue()
        var username = userNameInput.getValue()
        var password = passwordInput.getValue()

        console.log(name, surname, email, username, password)
    })
    this.add(form)

    // UN POCO DE ESTILOS 
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.gap = '15px'

    // NAME
    var nameLabel = new Label()
    nameLabel.setText('Name: ')
    form.add(nameLabel)

    var nameInput = new Input()
    form.add(nameInput)
    
    // SURNAME
    var surnameLabel = new Label()
    surnameLabel.setText('Surname: ')
    form.add(surnameLabel)

    var surnameInput = new Input()
    form.add(surnameInput)

    // EMAIL
    var emailLabel = new Label()
    emailLabel.setText('Email: ')
    form.add(emailLabel)

    var emailInput = new Input()
    form.add(emailInput)

    // USERNAME
    var userNameLabel = new Label()
    userNameLabel.setText('Username: ')
    form.add(userNameLabel)

    var userNameInput = new Input()
    form.add(userNameInput)

    // PASSWORD
    var passwordLabel = new Label()
    passwordLabel.setText('Password: ')
    form.add(passwordLabel)

    var passwordInput = new Input()
    form.add(passwordInput)

    //SUBMIT 
    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)

    // ANCHOR
     //BUTTON LOGIN
     var loginButton = new Button()
     loginButton.setText('LOGIN')
     
     loginButton.container.addEventListener('click', function(){
         document.body.removeChild(this.container)
         body.add(home)
     }.bind(this))
     this.add(loginButton)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

var register = new Register()

function Login(){
    // GENERO EL DIV
    Div.call(this)

    // GENERO EL CABECERO
    var header = new Headers(1)
    header.setText('Login')
    this.add(header)

    // USERNAME
    var username = new Label()
    username.setText('Username: ')
    this.add(username)

    var inputUsername = new Input()
    this.add(inputUsername)

    // PASSWORD
    var password = new Label()
    password.setText('Password: ')
    this.add(password)

    var inputPassword = new Input()
    this.add(inputPassword)

    //BUTTON LOGIN
    var loginButton = new Button()
    loginButton.setText('LOGIN')
    
    loginButton.container.addEventListener('click', function(){
        document.body.removeChild(this.container)
        body.add(home)
    }.bind(this))
    this.add(loginButton)
    
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

var login = new Login()

function Home(){
    Div.call(this)

    //GENERO EL CABECERO
    var header = new Headers(1)
    header.setText('HOME')
    this.add(header)

    //BOTON LOG OUT
    var loginButton = new Button()
    loginButton.setText('LOGOUT')

    loginButton.container.addEventListener('click', function(){
        document.body.removeChild(this.container)
        body.add(landing)
    }.bind(this))
    this.add(loginButton)
    
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

var home = new Home()