// FUNCION PARA CREAR DIV
function Div(){
    Component.call(this, 'div')
}

Div.prototype = Object.create(Component.prototype)
Div.prototype.constructor = Div
