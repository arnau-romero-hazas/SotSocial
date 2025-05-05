// REGISTER
class Register extends Component{
        constructor(){
        // CREO UN DIV
        super('div')

        // HEADER REGISTER
        const header = new Headers(1)
        header.setText('REGISTER')
        this.add(header)

        // CREO FORM Y LO HAGO HIJO DE REGISTER.CONTAINER
        const form = new Form()
        form.addSubmitListener(function(event){
            event.preventDefault()

            console.log('register submit')

            const name = nameInput.getValue()
            const surname = userNameInput.getValue()
            const email = emailInput.getValue()
            const username = userNameInput.getValue()
            const password = passwordInput.getValue()

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
        const nameLabel = new Label()
        nameLabel.setText('Name: ')
        form.add(nameLabel)

        const nameInput = new Input()
        form.add(nameInput)
        
        // SURNAME
        const surnameLabel = new Label()
        surnameLabel.setText('Surname: ')
        form.add(surnameLabel)

        const surnameInput = new Input()
        form.add(surnameInput)

        // EMAIL
        const emailLabel = new Label()
        emailLabel.setText('Email: ')
        form.add(emailLabel)

        const emailInput = new Input()
        emailInput.setType('email')
        form.add(emailInput)

        // USERNAME
        const userNameLabel = new Label()
        userNameLabel.setText('Username: ')
        form.add(userNameLabel)

        const userNameInput = new Input()
        form.add(userNameInput)

        // PASSWORD
        const passwordLabel = new Label()
        passwordLabel.setText('Password: ')
        form.add(passwordLabel)

        const passwordInput = new Input()
        passwordInput.setType('password')
        form.add(passwordInput)

        //SUBMIT 
        const submitButton = new Button()
        submitButton.setText('Register')
        submitButton.setType('submit')
        form.add(submitButton)

        // ANCHOR
        //BUTTON LOGIN
        const loginAnchor = new Anchor()
        loginAnchor.setText('LOGIN')
        this.loginAnchor = loginAnchor // Creo 'loginAnchor' como propiedad de register, así consigo que sea visible para la funcion *1
        this.add(loginAnchor)
    }

    /*1
    Declaro funcion en el prototype de register, 
    que se encargara de vigilar cuando pulsemos el anchor de login 
    y pasarle esta accion a main, para que main se encargue de quitar 
    register y poner login.
    */
    addLoginClickListener(listener){
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

    addRegisterSubmitListener(listener){ //*2
        this.registerSubmitListener = listener
    }
}