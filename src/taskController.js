import { TaskInputHandler } from "./taskInputHandler";
import { Form } from "./createForm";
import { elementFactory } from "./elementFactory";
import { projectInputHandler } from "./handleProject";
import { taskInputHandle } from "./taskInputHandler";

class taskDOMControll{

    constructor(formdisplay, taskDisplay){
        this.formdisplay = formdisplay
        this.taskDisplay = taskDisplay
        //this.taskFrom = document.getElementById('taskForm')
    }
    
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

            // Get the task list from input handler and render them in taskDisplay section
            let tasksToDisplay = taskInputHandle.returnTaskInput()
            this.taskDisplay.textContent = ""
            for(let i = 0; i < tasksToDisplay.length; i++){
                this.taskDisplay.append(elementFactory.displaycardElement(tasksToDisplay[i]))
            }

            taskFrom.reset()
        })

        //this.updateTaskFormProjects()
    }

    // updateTaskFormProjects() {
    // const taskFormHolder = document.getElementById("form-display")

    // taskFormHolder.innerHTML = ""
    // taskFormHolder.append(Form.RenderTaskForm())    


    // }
}

export {taskDOMControll}