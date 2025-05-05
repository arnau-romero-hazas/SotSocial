// FUNCION PARA CREAR INPUTS
class Input extends Component{
    constructor(){
        super('input')
    }

    setType(type) {
    this.container.type = type
    }

    setPlaceholder(placeholder) {
    this.container.placeholder = placeholder
    }

    getValue() {
    return this.container.value
    }
}