import { elementFactory } from "./elementFactory"
import { projectInputHandler } from "./handleProject"

class Form{

    //static form = document.createElement("form")    
    

    constructor(){

    }
    
    static RenderTaskForm(projectLists){
        let form = document.createElement("form")    
        form.innerHTML = ""
        form.setAttribute("action","")
        form.setAttribute("method","get")
        form.setAttribute("id","taskForm")
        this.TextInputElement(form)
        this.ProjectListElement(form,projectLists)
        this.TaskImportantLevelElement(form)
        this.dueDateElement("task-duedate","taskdueDate",form)
        this.BtnElement("Add","submit-btn","submitTaskBtn","submit",form)
        this.BtnElement("Clear","clear-btn","clearTaskBtn","reset",form)
        return form
    }

    static RenderProjectForm(){
        let form = document.createElement("form")
        form.innerHTML = ""
        form.setAttribute("action","")
        form.setAttribute("method","get")
        form.setAttribute("id","projectForm")
        this.ProjectInputElement(form)
        this.TaskImportantLevelElement(form)
        this.dueDateElement("project-duedate","projectDuedate",form)
        this.BtnElement("Add","submit-btn","submitProjectBtn","submit",form)
        this.BtnElement("Clear","clear-btn","clearProjectBtn","reset",form)
        return form
    }

    // Class for task elementp
    static TextInputElement(form){
        const taskLable = elementFactory.makeFormElement("label","Task Name: ","","","taskName","","","")
        const taskInput = elementFactory.makeFormElement("input","","task-input","taskInput","","taskName","text",1)
        form.append(taskLable)
        form.append(taskInput)
    }

    static ProjectInputElement(form){
        const taskLable = elementFactory.makeFormElement("label","Project Name: ","","","projectName","","","")
        const taskInput = elementFactory.makeFormElement("input","","project-input","projectInput","","ProjectName","text",1)
        form.append(taskLable)
        form.append(taskInput)
    }

    static ProjectListElement(form, projectLists){
                
        const ProjectLevel = elementFactory.makeFormElement("label","Choose A project:","","","projects","",0)
        
        const optionHolder = elementFactory.makeElement("select","","project-option","ProjectOptions")
        optionHolder.name = "projects"

        let renderProjectList = []


        for(let i = 0; i < projectLists.length; i++){
            let currentProject = projectLists[i]
            let option = elementFactory.optionElement("option",currentProject[0],"","",currentProject[0])
            renderProjectList.push(option)
        }

        // const optionOne = elementFactory.optionElement("option","Project One","","","Project One")
        // const optionTwo = elementFactory.optionElement("option","Project Two","","","Project Two")
        // const optionThree = elementFactory.optionElement("option","Project Three","","","Project Three")
        // //Append to the option holder
        // elementFactory.pushElements(optionHolder,[optionOne,optionTwo,optionThree])
        
        elementFactory.pushElements(optionHolder,renderProjectList)

        // Append to the main Form
        form.append(ProjectLevel)
        form.append(optionHolder)
    }

    static TaskImportantLevelElement(form){
        const ImportantLable = elementFactory.makeFormElement("label","Choose Urgent level:","","","importantLevel","",0)
        
        const optionHolder = elementFactory.makeElement("select","","important-option","levelOptions")
        optionHolder.name = "level"

        const optionOne = elementFactory.optionElement("option","Chill","","","chill")
        const optionTwo = elementFactory.optionElement("option","Important","","","important")
        const optionThree = elementFactory.optionElement("option","Urgent","","","Urgent")

        // Append to the option holder
        elementFactory.pushElements(optionHolder,[optionOne,optionTwo,optionThree])

        // Append to the main Form
        form.append(ImportantLable)
        form.append(optionHolder)        
    }

    static dueDateElement(dueDateClass, dueDateId,form){
        const dueDateLable = elementFactory.makeFormElement("label","Due Date","","","dDate","dDate","","")
        const dueDateInput = elementFactory.makeFormElement("input","",dueDateClass,dueDateId,"","","date",1)

        const today = new Date()
        dueDateInput.min = today.toLocaleDateString()

        form.append(dueDateLable)
        form.append(dueDateInput)
    }
    
    static BtnElement(textContent, className, idName, btnType,form){
        const btn = elementFactory.makeElement("button",textContent,className,idName)
        btn.type = btnType
        form.append(btn)
    }

}


export {Form}
