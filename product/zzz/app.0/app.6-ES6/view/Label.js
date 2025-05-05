// FUNCION PARA CREAR LADERS
class Label extends Component{
    constructor(){
        super('label')
    }
    setText(text) {
        this.container.textContent = text
    }
}