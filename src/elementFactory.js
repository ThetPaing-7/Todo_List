class elementFactory{

    static makeElement(element = 'div', text = '', className = '', idName = '') {
        const component = document.createElement(element);
        
        if (text) component.textContent = text;
        if (className) component.classList.add(...className.split(' '));
        if (idName) component.id = idName;

        return component;
    }

    static makeFormElement(element = "div", text = "", className = "", idName = "", forName = "" ,nameValue = "", elementType = "", isrequired = 0){
        const component = document.createElement(element)

        if(text) component.textContent = text
        if (className) component.classList.add(...className.split(' '));
        if (idName) component.id = idName;
        if(forName) component.for = forName
        if(nameValue) component.name = nameValue
        if(elementType) component.type = elementType
        
        // Checkfor require 
        if(isrequired === 1){
            component.required = true
        }else{
            component.required = false
        }

        return component

    }

    static optionElement(element = 'div', text = '', className = '', idName = '', valueName = ''){
        const component = document.createElement(element);
        
        if (text) component.textContent = text;
        if (className) component.classList.add(...className.split(' '));
        if (idName) component.id = idName;
        if (valueName) component.value = valueName

        return component;
    }

    static pushElements(parentElement,childElement){

        for(let i = 0; i < childElement.length; i++){
            parentElement.append(childElement[i])
        }
    }

}

export {elementFactory}