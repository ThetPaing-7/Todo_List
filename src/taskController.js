import { TaskInputHandler } from "./taskInputHandler";
import { Form } from "./createForm";
import { elementFactory } from "./elementFactory";

class taskDOMControll{

    constructor(formdisplay, taskDisplay){
        this.formdisplay = formdisplay
        this.taskDisplay = taskDisplay
        //this.taskFrom = document.getElementById('taskForm')
    }

    DoTaskDomStuff(){
        this.formdisplay.innerHTML = ""
        this.formdisplay.replaceWith(Form.RenderTaskForm())

        let taskFrom = document.getElementById("taskForm")
        let taskHandler = new TaskInputHandler()

        taskFrom.addEventListener("submit",(event)=>{   
            event.preventDefault()
            taskHandler.getTaskInput(taskFrom) 

            // Get the task list from input handler and render them in taskDisplay section
            let tasksToDisplay = taskHandler.returnTaskInput()
            this.taskDisplay.textContent = ""
            for(let i = 0; i < tasksToDisplay.length; i++){
                this.taskDisplay.append(elementFactory.displaycardElement(tasksToDisplay[i]))
            }
        })
    }
}

export {taskDOMControll}