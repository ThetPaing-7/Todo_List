import { TaskInputHandler } from "./taskInputHandler";
import { Form } from "./createForm";
import { elementFactory } from "./elementFactory";
import { projectInputHandler } from "./handleProject";

class taskDOMControll{

    constructor(formdisplay, taskDisplay){
        this.formdisplay = formdisplay
        this.taskDisplay = taskDisplay
        //this.taskFrom = document.getElementById('taskForm')
        this.taskHandler = new TaskInputHandler()
    }


    DoTaskDomStuff(returnProject){
        this.formdisplay.innerHTML = ""

        // For the debugging purpose
        console.log(returnProject)

        this.formdisplay.append(Form.RenderTaskForm(returnProject))

        let taskFrom = document.getElementById("taskForm")

        taskFrom.addEventListener("submit",(event)=>{   
            event.preventDefault()
            this.taskHandler.getTaskInput(taskFrom) 

            // Get the task list from input handler and render them in taskDisplay section
            let tasksToDisplay = this.taskHandler.returnTaskInput()
            this.taskDisplay.textContent = ""
            for(let i = 0; i < tasksToDisplay.length; i++){
                this.taskDisplay.append(elementFactory.displaycardElement(tasksToDisplay[i]))
            }
        })

    }
}

export {taskDOMControll}