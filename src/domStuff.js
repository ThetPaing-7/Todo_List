import { elementFactory } from "./elementFactory"
import { Darkmode } from "./switchTheme"
import { taskDOMControll } from "./taskController"
import { projectDOMControll } from "./projectController"
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

        const addTasks = elementFactory.makeElement("button","Add Task","add task","addTasksBtn")
        const addProjects = elementFactory.makeElement("button","Add Project","add project","addProjectsBtn")

        elementFactory.pushElements(recordBody,[addTasks,addProjects])

        const taskFrom = document.getElementById('taskForm')
        
        const taskControl = new taskDOMControll(formDisplayGp,taskDisplayGp)
        const projectControl = new projectDOMControll(formDisplayGp,taskDisplayGp)
        const ReturnProjectContoller = new projectInputHandler()

        const actionButtons = document.querySelectorAll('.add')
        actionButtons.forEach(button => button.addEventListener("click",(event)=>{
            const item = event.target.id
        
            if(item === 'addTasksBtn'){
                let returnProject = ReturnProjectContoller.returnProjectInput()
                taskControl.DoTaskDomStuff(returnProject)
            }else if(item === 'addProjectsBtn'){  
                projectControl.DoProjectDomStuff()
                
            }else{
                console.log("enter A valid click")
            }
        }))
        
        

        // let projectHandler = new projectInputHandler()
        // // To handle, get and return of task Input
        // let taskHandler = new TaskInputHandler()
        // // Render Form 
        // addTasks.addEventListener("click",() =>{

        //     // To handle, get and return of project Input
            
        //     formDisplayGp.innerHTML = ""
        //     formDisplayGp.append(Form.RenderTaskForm())

        //     const taskFrom = document.getElementById('taskForm')
        //     taskFrom.addEventListener("submit",(event)=>{   
        //     event.preventDefault()
        //     taskHandler.getTaskInput(taskFrom) 

        //     // Get the task list from input handler and render them in taskDisplay section
        //     let tasksToDisplay = taskHandler.returnTaskInput()
        //     taskDisplayGp.textContent = ""
        //     for(let i = 0; i < tasksToDisplay.length; i++){
        //         taskDisplayGp.append(elementFactory.displaycardElement(tasksToDisplay[i]))
        //     }
        // })
        
        // })

        // addProjects.addEventListener("click",() =>{
        //     formDisplayGp.innerHTML = ""
        //     formDisplayGp.append(Form.RenderProjectForm())
        //     // Grab the form
        //     const projectForm = document.getElementById('projectForm')
        //     projectForm.addEventListener("submit", (event) => {
        //         event.preventDefault()

        //         // Get the input from user
        //         projectHandler.getProjectInput(projectForm)

        //     })
        // })

    }


}


export{DomController}