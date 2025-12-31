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

        const todoTaskDisplay = document.getElementById("todoDisplayBtn")
        const completeTaskDisplay = document.getElementById("completeDisplayBtn")
        const deletedTaskDisplay = document.getElementById("deleteDisplayBtn")

        todoTaskDisplay.addEventListener("click",() =>{
            this.renderProjects()
        })

        completeTaskDisplay.addEventListener("click",() =>{
            this.renderCompleteProject()
        })

        deletedTaskDisplay.addEventListener("click", () => {
            this.renderDeletedProject()
        })

    }



    renderDeletedProject(){
         this.projectDisplay.innerHTML = ""

        const projects = projectReturn.softDeleteProject

        projects.forEach((project, index) => {
            const card = document.createElement("div")
            card.classList.add("project-card")

            const check = document.createElement("button")
            check.textContent = "Restore"
            check.addEventListener("click",() =>{
                this.restoreProject(project)
            })

            const projectTitle = document.createElement("h3")
            projectTitle.textContent = project.projectName

            const priority = document.createElement("p")
            priority.textContent = project.ProjectImportantLevel

            const dueDate = document.createElement("p")
            dueDate.textContent = project.projectDueDate

            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete Permantly"

            deleteBtn.addEventListener("click", () => {
                this.permantlyDeleteProject(project)
            })

            elementFactory.pushElements(card,[check,projectTitle,dueDate,priority,deleteBtn])
            this.projectDisplay.append(card)
        })
    }


    renderCompleteProject(){
         this.projectDisplay.innerHTML = ""

        const projects = projectReturn.completeProject

        projects.forEach((project, index) => {
            const card = document.createElement("div")
            card.classList.add("project-card")

            const check = document.createElement("button")
            check.textContent = "Uncomplete"
            check.addEventListener("click",() =>{
                this.completeProject(project)
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
                this.SoftDeleteProject(project)
            })

            elementFactory.pushElements(card,[check,projectTitle,dueDate,priority,deleteBtn])
            this.projectDisplay.append(card)
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
            this.checkStatusProject(check,card,project)

            const projectTitle = document.createElement("h3")
            projectTitle.textContent = project.projectName

            const priority = document.createElement("p")
            priority.textContent = project.ProjectImportantLevel

            const dueDate = document.createElement("p")
            dueDate.textContent = project.projectDueDate

            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete"

            deleteBtn.addEventListener("click", () => {
                this.SoftDeleteProject(project)
            })

            elementFactory.pushElements(card,[check,projectTitle,dueDate,priority,deleteBtn])
            this.projectDisplay.append(card)
        })
    }

    checkStatusProject(check,card,project){
        check.addEventListener("change", () => {
            if (check.checked) {
                projectReturn.complete(project)
            } else {
                projectReturn.uncomplete(project)
            }
            this.renderProjects()
        })
    }


    completeProject(project){
        projectReturn.uncomplete(project)
        this.renderCompleteProject()
    }

    SoftDeleteProject(index){
        projectReturn.remove(index)
        this.renderProjects()
        //console.log(`soft Delete project" ${projects}`)
    }

    // Restore Project
    restoreProject(project){
        projectReturn.restore(project)
        this.renderProjects()
    }

    permantlyDeleteProject(index){
        projectReturn.deletePermanent(index)
        this.renderDeletedProject()
    }
    
}


export {projectDOMControll}