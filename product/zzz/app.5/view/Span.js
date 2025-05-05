// FUNCION PARA CREAR SPAN

function Span(){
    Component.call(this, 'span')
}

Span.prototype = Object.create(Component.prototype)
Span.prototype.constructor = Span