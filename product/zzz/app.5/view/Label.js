// FUNCION PARA CREAR LADERS

function Label(){
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Label
