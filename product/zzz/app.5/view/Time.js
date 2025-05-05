function Time(){
    Component.call(this, 'time')
}

Time.prototype = Object.create(Component.prototype)
Time.prototype.constructor = Time

Time.prototype.setText = function(text){
    this.container.textContent =  text
}