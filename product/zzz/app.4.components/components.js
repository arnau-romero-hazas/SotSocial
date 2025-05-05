
function Component(tagName){ // Constructora para crear elementos
    this.container = document.createElement(tagName)
}

 
Component.prototype.add = function (child){ // Añadimos una propiedad add a components, la cual es una funcion que hace un appenchild.
    this.container.appendChild(child.container)
}

function Form(){ //Funcion para crear formularios
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype) // en el prototype de component creas un ocjeto que es el form.prototype
Form.prototype.constructor = Form //al form.prototype.constructor asignas el tipo form

function Input(){ // Funcion pra crear input
    Component.call(this, 'input') 
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setType = function (type){ //Funcion para assignar el tipo al elemento que creemos con Input.
    this.container.type = type
}

Input.prototype.setPlaceholder = function (placeholder){ //Funcion para assignar un setPlaceHolder al elemento input(esto lo que hace es que muestra un texto gris dentro del input que indica al usuario lo que va dentro)
    this.container.placeholder = placeholder
}

function Button(){ 
    Component.call(this, 'button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type){
    this.container.type = type   
}

Button.prototype.setText = function(text){
    this.container.textContent = text
}

// DEMO

var Form = new Form()

var input = new Input()
input.setType('text')
