import { TaskInputHandler } from "./taskInputHandler";
import { Form } from "./createForm";
import { elementFactory } from "./elementFactory";
import { projectInputHandler } from "./handleProject";
import { taskInputHandle } from "./taskInputHandler";

class taskDOMControll{
    
    constructor(formdisplay, taskDisplay){
        this.formdisplay = formdisplay
        this.taskDisplay = taskDisplay
        //this.buttons = document.querySelectorAll(".delete-btn")
        //this.taskFrom = document.getElementById('taskForm')
    }

    //buttons = document.querySelectorAll(".delete-btn")
    
    //projectHandler = new projectInputHandler()
    DoTaskDomStuff(){
        this.formdisplay.innerHTML = ""
        
        //let projectHandler = new projectInputHandler()     
        //let returnProject = this.projectHandler.returnProjectInput()
        // For the debugging purpose
        

        this.formdisplay.append(Form.RenderTaskForm())

        let taskFrom = document.getElementById("taskForm")

        taskFrom.addEventListener("submit",(event)=>{   
            event.preventDefault()
            taskInputHandle.getTaskInput(taskFrom) 
            taskFrom.reset()
            
            this.renderTaks()
        })


    }

    renderTaks(){
        this.taskDisplay.innerHTML = ""

        const tasks = taskInputHandle.returnTaskInput()

        tasks.forEach((task, index) => {
            const card = document.createElement("div")
            card.classList.add("task-card")

            const check = document.createElement("input")
            check.type = "checkbox"
            check.addEventListener("change",() => {
            card.classList.toggle("task-card-complete")

            })

            const title = document.createElement("p")
            title.textContent = task.taskName

            const project = document.createElement("h3")
            project.textContent = task.projectName

            const priority = document.createElement("p")
            priority.textContent = task.taskImportantLevel

            const dueDate = document.createElement("p")
            dueDate.textContent = task.dueDate

            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete"

            deleteBtn.addEventListener("click", () => {
                this.deleteTask(index)
            })

            elementFactory.pushElements(card,[check,title,project,dueDate,priority,deleteBtn])
            this.taskDisplay.append(card)
        })
    }

    deleteTask(index){
        taskInputHandle.remove(index)
        this.renderTaks()
        console.log(taskInputHandle.returnTaskInput())
    }


    
}

export {taskDOMControll}