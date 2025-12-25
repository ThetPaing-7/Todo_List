import { elementFactory } from "./elementFactory"
import { Darkmode } from "./switchTheme"
import { Form } from "./createForm"
import { TaskInputHandler } from "./taskInputHandler"
import { projectInputHandler } from "./handleProject"

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

        

        // To handle, get and return of project Input
        let projectHandler = new projectInputHandler()
        let retrunProjects = projectHandler.returnProjectInput()
        // To handle, get and return of task Input
        let taskHandler = new TaskInputHandler()
        // Render Form 
        addTasks.addEventListener("click",() =>{
            
            formDisplayGp.append(Form.RenderTaskForm(retrunProjects))

            const taskFrom = document.getElementById('taskForm')
            taskFrom.addEventListener("submit",(event)=>{
            event.preventDefault()
            taskHandler.getTaskInput() 

            // Get the task list from input handler and render them in taskDisplay section
            let tasksToDisplay = taskHandler.returnTaskInput()
            taskDisplayGp.textContent = ""
            for(let i = 0; i < tasksToDisplay.length; i++){
                taskDisplayGp.append(elementFactory.displaycardElement(tasksToDisplay[i]))
            }
        })
        
        })

        addProjects.addEventListener("click",() =>{
            formDisplayGp.append(Form.RenderProjectForm())
            // Grab the form
            const projectForm = document.getElementById('projectForm')
            projectForm.addEventListener("submit", (event) => {
                event.preventDefault()

                // Get the input from user
                projectHandler.getProjectInput()

            })
        })

    }


}


export{DomController}