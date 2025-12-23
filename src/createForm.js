import { elementFactory } from "./elementFactory"

class Form{

    static form = document.createElement("form")


    constructor(){

    }
    
    static RenderTaskForm(){
        this.form.innerHTML = ""
        this.form.setAttribute("action","")
        this.form.setAttribute("method","get")
        this.form.setAttribute("id","taskForm")
        this.TextInputElement()
        this.ProjectListElement()
        this.TaskImportantLevelElement()
        this.dueDateElement()
        this.BtnElement("Add","submit-btn","submitTaskBtn","submit")
        this.BtnElement("Clear","clear-btn","clearTaskBtn","reset")
        return this.form
    }

    static RenderProjectForm(){
        this.form.innerHTML = ""
        this.form.setAttribute("action","")
        // this.form.setAttribute("method","get")
        this.ProjectInputElement()
        this.TaskImportantLevelElement()
        this.dueDateElement()
        this.BtnElement("Add","submit-btn","submitProjectBtn","submit")
        this.BtnElement("Clear","clear-btn","clearProjectBtn","reset")
        return this.form
    }

    // Class for task elementp
    static TextInputElement(){
        const taskLable = elementFactory.makeFormElement("label","Task Name: ","","","taskName","","","")
        const taskInput = elementFactory.makeFormElement("input","","","taskInput","","taskName","text",1)
        this.form.append(taskLable)
        this.form.append(taskInput)
    }

    static ProjectInputElement(){
        const taskLable = elementFactory.makeFormElement("label","Project Name: ","","","projectName","","","")
        const taskInput = elementFactory.makeFormElement("input","","","projectInput","","ProjectName","text",1)
        this.form.append(taskLable)
        this.form.append(taskInput)
    }

    static ProjectListElement(){
        const ProjectLevel = elementFactory.makeFormElement("label","Choose A project:","","","projects","",0)
        
        const optionHolder = elementFactory.makeElement("select","","","ProjectOptions")
        optionHolder.name = "projects"

        const optionOne = elementFactory.optionElement("option","Project One","","","Project One")
        const optionTwo = elementFactory.optionElement("option","Project Two","","","Project Two")
        const optionThree = elementFactory.optionElement("option","Project Three","","","Project Three")

        // Append to the option holder
        elementFactory.pushElements(optionHolder,[optionOne,optionTwo,optionThree])

        // Append to the main Form
        this.form.append(ProjectLevel)
        this.form.append(optionHolder)
    }

    static TaskImportantLevelElement(){
        const ImportantLable = elementFactory.makeFormElement("label","Choose Urgent level:","","","importantLevel","",0)
        
        const optionHolder = elementFactory.makeElement("select","","","levelOptions")
        optionHolder.name = "level"

        const optionOne = elementFactory.optionElement("option","Chill","","","chill")
        const optionTwo = elementFactory.optionElement("option","Important","","","important")
        const optionThree = elementFactory.optionElement("option","Urgent","","","Urgent")

        // Append to the option holder
        elementFactory.pushElements(optionHolder,[optionOne,optionTwo,optionThree])

        // Append to the main Form
        this.form.append(ImportantLable)
        this.form.append(optionHolder)        
    }

    static dueDateElement(){
        const dueDateLable = elementFactory.makeFormElement("label","Due Date","","","dDate","dDate","","")
        const dueDateInput = elementFactory.makeFormElement("input","","due-date","dDate","","","date",1)

        const today = new Date()
        dueDateInput.min = today.toLocaleDateString()

        this.form.append(dueDateLable)
        this.form.append(dueDateInput)
    }
    
    static BtnElement(textContent, className, idName, btnType){
        const btn = elementFactory.makeElement("button",textContent,className,idName)
        btn.type = btnType
        this.form.append(btn)
    }

}


export {Form}
