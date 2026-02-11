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
        this.formdisplay.append(Form.RenderTaskForm())

        this.renderTask()
        let taskFrom = document.getElementById("taskForm")

        taskFrom.addEventListener("submit",(event)=>{   
            event.preventDefault()
            taskInputHandle.getTaskInput(taskFrom) 
            taskFrom.reset()
            
            this.renderTask()
        })

        const todoTaskDisplay = document.getElementById("todoDisplayBtn")
        const completeTaskDisplay = document.getElementById("completeDisplayBtn")
        const deletedTaskDisplay = document.getElementById("deleteDisplayBtn")

        todoTaskDisplay.addEventListener("click",() =>{
            this.renderTask()
        })

        completeTaskDisplay.addEventListener("click",() =>{
            this.renderCompleteTask()
        })

        deletedTaskDisplay.addEventListener("click", () => {
            this.renderDeletedTask()
        })

    }

    renderTask(){
        this.taskDisplay.innerHTML = ""

        const tasks = taskInputHandle.returnTaskInput()

        tasks.forEach((task, index) => {
            const card = document.createElement("div")
            card.classList.add("task-card")

            const check = document.createElement("button")
            check.textContent = "Complete"
            this.checkStatusTask(check,task)

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
                this.SoftDeletetask(task)
            })

            elementFactory.pushElements(card,[check,title,project,dueDate,priority,deleteBtn])
            this.taskDisplay.append(card)
        })
    }


     renderCompleteTask(){
        this.taskDisplay.innerHTML = ""

        const tasks = taskInputHandle.completeTask

        tasks.forEach((task, index) => {
            const card = document.createElement("div")
            card.classList.add("task-card")

            const check = document.createElement("button")
            check.textContent = "Uncomplete"
            check.addEventListener("click",() => {
                this.completeTask(task)
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
                this.deleteCompleteTask(task)
            })

            elementFactory.pushElements(card,[check,title,project,dueDate,priority,deleteBtn])
            this.taskDisplay.append(card)
        })
    }



     renderDeletedTask(){
        this.taskDisplay.innerHTML = ""

        const tasks = taskInputHandle.softDeleteTask

        tasks.forEach((task, index) => {
            const card = document.createElement("div")
            card.classList.add("task-card")

            const check = document.createElement("button")
            check.textContent = "Restore"
            check.addEventListener("click", () => {
                this.restoreTask(task)
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
                this.permantlyDeleteTask(task)
            })

            elementFactory.pushElements(card,[check,title,project,dueDate,priority,deleteBtn])
            this.taskDisplay.append(card)
        })
    }

    checkStatusTask(check,task){
            check.addEventListener("click", () => {
                {
                    taskInputHandle.complete(task)
                    this.renderTask()
                }
            }
    )}
    
    
        completeTask(project){
            taskInputHandle.uncomplete(project)
            this.renderCompleteTask()
        }
    
        SoftDeletetask(project){
            taskInputHandle.remove(project)
            this.renderTask()
            //console.log(`soft Delete project" ${projects}`)
        }
    
        // Restore Project
        restoreTask(project){
            taskInputHandle.restore(project)
            this.renderTask()
        }
    
        permantlyDeleteTask(project){
            taskInputHandle.deletePermanent(project)
            this.renderDeletedTask()
        }

        deleteCompleteTask(project){
            taskInputHandle.removeFromCompletetask(project)
            this.renderCompleteTask()

        }

    
}

export {taskDOMControll}