class navButton{
    // Construct the id and text contect
    constructor(element,id, textContent){
        this.element = element
        this.id = id
        this.textContent = textContent
    }

    createButton(){
        let button = document.createElement(this.element)
        button.setAttribute("id",this.id)
        button.textContent = this.textContent
    }
}

export{navButton}

