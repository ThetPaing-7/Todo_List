import { projectInputHandler } from "./handleProject";
import { Form } from "./createForm";
import { elementFactory } from "./elementFactory";
import { projectReturn } from "./handleProject";

class projectDOMControll{

    constructor(formdisplay, projectDisplay){
        this.formdisplay = formdisplay
        this.projectDisplay = projectDisplay
        //this.taskFrom = document.getElementById('taskForm')
    }
    
    //projectHandler = new projectInputHandler() 

    DoProjectDomStuff(){
        this.formdisplay.innerHTML = ""
        this.formdisplay.append(Form.RenderProjectForm())

        this.renderProjects()
        let projectForm = document.getElementById("projectForm")

        projectForm.addEventListener("submit",(event)=>{   
            event.preventDefault()
            projectReturn.getProjectInput(projectForm) 
            projectForm.reset()
            this.renderProjects()
            
        })
        
    }

    renderProjects(){
        this.projectDisplay.innerHTML = ""

        const projects = projectReturn.returnProjectInput()

        projects.forEach((project, index) => {
            const card = document.createElement("div")
            card.classList.add("project-card")

            const check = document.createElement("input")
            check.type = "checkbox"
            check.addEventListener("change",() => {
            card.classList.toggle("project-card-complete")
            })

            const projectTitle = document.createElement("h3")
            projectTitle.textContent = project.projectName

            const priority = document.createElement("p")
            priority.textContent = project.ProjectImportantLevel

            const dueDate = document.createElement("p")
            dueDate.textContent = project.projectDueDate

            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete"

            deleteBtn.addEventListener("click", () => {
                this.deleteproject(index)
            })

            elementFactory.pushElements(card,[check,projectTitle,dueDate,priority,deleteBtn])
            this.projectDisplay.append(card)
        })
    }

    deleteproject(index){
        projectReturn.remove(index)
        this.renderProjects()
        console.log(projectReturn.returnProjectInput())
    }

    
    
    
}


export {projectDOMControll}