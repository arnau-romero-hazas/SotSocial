// FUNCION PARA CREAR FORMULARIOS
function Form(){
    Component.call(this, 'form')
}

Form.prototype = Object.create(Component.prototype) // en el prototype de component creas un ocjeto que es el form.prototype
Form.prototype.constructor = Form // al form.prototype.constructor asignas el tipo form

Form.prototype.addSubmitListener = function(callback){
    this.container.addEventListener('submit', callback)
}

Form.prototype.clear = function(){
    this.container.reset()
}