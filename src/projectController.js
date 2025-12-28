import { projectInputHandler } from "./handleProject";
import { Form } from "./createForm";
import { elementFactory } from "./elementFactory";

class projectDOMControll{

    constructor(formdisplay, projectDisplay){
        this.formdisplay = formdisplay
        this.projectDisplay = projectDisplay
        //this.taskFrom = document.getElementById('taskForm')
    }
    
    projectHandler = new projectInputHandler() 

    DoProjectDomStuff(){
        this.formdisplay.innerHTML = ""
        this.formdisplay.append(Form.RenderProjectForm())

        let projectForm = document.getElementById("projectForm")

        projectForm.addEventListener("submit",(event)=>{   
            event.preventDefault()
            this.projectHandler.getProjectInput(projectForm) 

            // Get the task list from input handler and render them in taskDisplay section
            let projectToDisplay = this.projectHandler.returnProjectInput()
            this.projectDisplay.textContent = ""
            for(let i = 0; i < projectToDisplay.length; i++){
                this.projectDisplay.append(elementFactory.displaycardElement(projectToDisplay[i]))
            }

            projectForm.reset()
        })
        
    }

    
}

export {projectDOMControll}