// FUNCION PARA CREAR BOTONES
class Button extends Component{
    constructor(){
        super('Button')
    }

    setType(type) {
        this.container.type = type
    }

    setText(text) {
        this.container.textContent = text
    }
}