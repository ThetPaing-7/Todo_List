import { elementFactory } from "./elementFactory"
import { Darkmode } from "./switchTheme"
import { Form } from "./createForm"

class DomController{

    constructor(){
        this.modeInstance = new Darkmode()
        this.theme = document.getElementById("theme-switch")
        this.body = document.getElementById("pageBody")

    }

    themeController(){     
        if(this.modeInstance.modeKey == 'active'){
            this.modeInstance.enableDarkmode()
        }

        this.theme.addEventListener("click",() => {
            let getmode = localStorage.getItem('darkmode')
            getmode === 'active' ? this.modeInstance.disableDarkmode() : this.modeInstance.enableDarkmode()
        })
    }

    homePageStart(){
        this.body.classList.toggle("homeBody")
        // Grab the page body
        const recordBody = elementFactory.makeElement("div","","recordGp","")
        const formDisplayGp = elementFactory.makeElement("div","","formDisplayGp","")
        const taskDisplayGp = elementFactory.makeElement("div","","taskDisplayGp","")

        elementFactory.pushElements(this.body,[recordBody,formDisplayGp,taskDisplayGp])

        const addTasks = elementFactory.makeElement("button","Add Task","","addTasksBtn")
        const addProjects = elementFactory.makeElement("button","Add Project","","addProjectsBtn")

        elementFactory.pushElements(recordBody,[addTasks,addProjects])

        // Render Form 
        addTasks.addEventListener("click",() =>{
            formDisplayGp.append(Form.RenderForm())
        })
        
    }


}


export{DomController}