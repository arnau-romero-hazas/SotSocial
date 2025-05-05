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
        try{
            // Enviar los datos a la logica.registUser
            logic.registerUser(name, email, username, password)
            // Limpiar formulario
            form.clear()
             // UNA VEZ RECOGIDO LOS DATOS POR PARTE DE FORM LLAMO A LA FUNCION PARA AVISAR A MAIN
            this.registerSubmitListener() //LLAMO A LA FUNCION *2
        }catch(error){
            // Capturar e imprimir errores
            console.log(error)
            alert(error.message)
        }
    }.bind(this))
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
    emailInput.setType('email')
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
    passwordInput.setType('password')
    form.add(passwordInput)

    //SUBMIT 
    var submitButton = new Button()
    submitButton.setText('Register')
    submitButton.setType('submit')
    form.add(submitButton)

    // ANCHOR
     //BUTTON LOGIN
     var loginAnchor = new Anchor()
     loginAnchor.setText('LOGIN')
     this.loginAnchor = loginAnchor // Creo 'loginAnchor' como propiedad de register, así consigo que sea visible para la funcion *1
     this.add(loginAnchor)
}

Register.prototype = Object.create(Component.prototype)
Register.prototype.constructor = Register

/*1
 Declaro funcion en el prototype de register, 
 que se encargara de vigilar cuando pulsemos el anchor de login 
 y pasarle esta accion a main, para que main se encargue de quitar 
 register y poner login.
*/
Register.prototype.addLoginClickListener = function (listener){
    this.loginAnchor.addClickListener(listener) //*1 
}

/*2
 Declaro funcion en el prototype de register, 
que se encargara de vigilar cuando pulsemos el button submit de formulario 
y pasarle esta accion a main,
ya que main es la que se tiene que encargar de quitar una pagina y poner otra, 
register solo se tiene que encargar de recoger los datos del formulario, 
separo responsabilidades.
*/

Register.prototype.addRegisterSubmitListener = function (listener){ //*2
    this.registerSubmitListener = listener
}
