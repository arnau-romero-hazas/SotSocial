var logic = {
    constant: {
        EMPTY_OR_BLANK_REGEX: /^\s*$/, // reGex para comprobar que no se envia un campo vacio ni con espacios
        EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, // reGex para comprobar que esta bien escrito un mail
        URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },
    validate:{
        //comprobar que sea string, que el texto no este vacio, que el email este en formato mail, maximo de caracteres, mínimo de caracteres,
        // nombre de usuario(no este en blanco, minimo y maximo), password(no este en blanco, maximo y minimo)
        string: function(string, explain){
            if (typeof string != 'string') throw new TypeError ('invalid' + explain + 'type') // Si el tipo de dato no es un string enviamos un error
        },
        text: function(text, explain){
            this.string(text,explain) // Traemos la funcion de arriba 
             //Accedemos a la reGex para verificar que en el text, no haya espacios en blanco o no hayan escrito nada.
            if(logic.constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new SyntaxError('invalid' + explain + 'type')
        },
        email: function(email,explain){
            this.string(email, explain) //llamamos a la funcion string pasandole los parametros introducidos para comprobar que es una string
            if(!logic.constant.EMAIL_REGEX.test(email)) throw new SyntaxError('invalid' + explain + 'type') // Comprobamos que el email coincida con la reGex que verifica mail
            this.maxLength(email, 30, explain) // Llamamos a la funcion maxLength para comprobar que el email no supere 30 caracteres
        },
        maxLength: function(value, maxLength, explain){ // Funcion para comprobar que no sobrepase el maximo de caracteres
            if(value.length > maxLength) throw new RangeError('' + explain + '') 
        },
        minLength: function(value , minLength, explain){ // Funcion para comprobar que sobrepase el mínimo de caracteres
            if(value.length < minLength) throw new RangeError('' + explain + '')
        },
        username: function(username, explain){
            this.string(username,explain) // Funcion para comprobar que es una string 
            this.maxLength(username, 10, explain) // Llamamos funcion para comprobar que no sobrepasemos límite de caracteres.
            this.minLength(username, 1 , explain) // Llamamos funcion para comprobar el límite de caracteres.
        },
        password: function(password, explain){
            this.string(password,explain) // Funcion para comprobar que es una string 
            this.maxLength(password, 20, explain) // Llamamos funcion para comprobar que no sobrepasemos límite de caracteres.
            this.minLength(password, 8 , explain) // Llamamos funcion para comprobar el límite de caracteres.
        },
        url: function(url, explain){
            this.string(url, explain)
            if(!logic.constant.URL_REGEX.test(url)) throw new SyntaxError('invalid' + explain + 'syntax')
        }

    },

    registerUser: function (name, email, username, password){
        this.validate.text(name, 'name') // Llamamos a la logic.validate.text para validar que name es un string, pasamos el string name que sera el explain en caso de que salte el error.
        this.validate.maxLength(name, 20, 'name') // Validamos que name no supere 20 
        this.validate.email(email, 'email') // validamos email
        this.validate.username(username, 'username') // validamos username
        this.validate.password(password, 'password') // validamos password 

        var found  // Declaramos for en undefined que es igual a false

        for(var i = 0 ; i < data.users.length && found == false ; i ++){ // bucle for que recorra el array de users y mientas no encuentre al usuario
           var user = data.users[i] // Guardamos el valor de la iteracion de data users en la variable user
            if(user.email == user || user.username == user) 
                found = user
        }
           if (found) throw new Error('User already exists') // y comparamos la variable user que acabamos de crear con el username y el email que nos ha introducido para comprobar que no exista ya, si existe lanzamos error
         // si no existe no lanzaremos error y saldremos del bucle for, por lo que los datos serian validos y los podemos guardar en una variable user que sera un objeto con todos los datos
        var user = { 
            id: data.uuid(), // generamos una nueva id para guardarla para este usuario, gracias a la funcion que hemos creado en data
            name: name,
            email: email,
            username: username,
            password: password

        }

        data.users[data.users.length] = user // guardamos los datos del usuario alfinal del array users. 
    },
    loginUser: function(username, password){
        this.validate.username(username, 'username') // validamos username
        this.validate.password(password, 'password') // validamos password 
        var found
        // Buscar el username este en la base de datos
        for(var i = 0 ; i < data.users.length && !found; i ++){ // bucle for que recorra el array de users y mientas no encuentre al usuario
            var user = data.users[i] // Guardamos el valor de la iteracion de data users en la variable user
            if(user.username === username){  // si los username son iguales entramos al if
                found = user // y asignamos a foun el valor del objeto user
            } 
           
         }
         if (!found || found.password !== password) throw new Error('Wrong credentials')  // no emetiremos el error : si found no es undefined (pk hemos assignado user al encontrar que el username son iguales) || y si las pawsword no son iguales (que sera false si son iguales asi de paso comprobamos que la haya puesto bien) 
        
        // Si lo encontramos le assignamos al usuario su id, esto simula como si estuviese online
        data.userId = found.id 
    },
    logoutUser: function(){
        // Poner el userId a null cuando hagamos logOut
        data.userId = null
    },

    getUserName: function(){
        // TODO funcion para extraer el nombre real y mostrarlo en home a modo de bienvenida
        var found
        for(var i = 0 ; i < data.users.length ; i++){
           var user = data.users[i]
           if(user.id === data.userId) 
            found = user
        }
        if (!found) throw new Error (' user not found ')
        
        return found.name
    },

    getPosts: function(){ // Crear funcion para obtener los posts de data, la llamaremos desde main
        return data.posts
    },
    createPost: function(image, text){ // Funcion para la logica de crear post
        this.validate.url(image)
        this.validate.text(text)

        var post = {
            id: data.uuid(),
            author: data.userId,
            image: image,
            text: text,
            createdAt: new Date(),
            modifiedAt: null,
            likes: []
        }

        data.posts[data.posts.length] = post
    },

    toggleLikePost: function(){
        // TODO funcion para quitar y poner likes en los posts.
        
    }
}