import { elementFactory } from "./elementFactory"
import { Darkmode } from "./switchTheme"
import { taskDOMControll } from "./taskController"
import { projectDOMControll } from "./projectController"
import { projectInputHandler } from "./handleProject"
import { ChartFactory } from "./chartFactory"
import { taskInputHandle } from "./taskInputHandler"

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
        this.body.innerHTML = ""
        this.body.classList.remove("chartBody")
        this.body.classList.add("homeBody")
        // Grab the page body
        const recordBody = elementFactory.makeElement("div","","recordGp","")
        const formDisplayGp = elementFactory.makeElement("div","","formDisplayGp","form-display")
        const DisplayGp = elementFactory.makeElement("div","","DisplayGp","")

        // Three buttons for display gp
        const todo = elementFactory.makeElement("button","To do...","todo-Btn","todoDisplayBtn")
        const complete = elementFactory.makeElement("button","complete Task","complete-Btn","completeDisplayBtn")
        const deleteTask = elementFactory.makeElement("button","delete Task","delete-display-Btn","deleteDisplayBtn")

        elementFactory.pushElements(DisplayGp,[todo,complete,deleteTask])
        
        const taskDisplayGp = elementFactory.makeElement("div","","taskDisplayGp","")
        elementFactory.pushElements(DisplayGp, [taskDisplayGp])

        elementFactory.pushElements(this.body,[recordBody,formDisplayGp,DisplayGp])

        const addTasks = elementFactory.makeElement("button","Add Task","add task","addTasksBtn")
        const addProjects = elementFactory.makeElement("button","Add Project","add project","addProjectsBtn")

        elementFactory.pushElements(recordBody,[addTasks,addProjects])

        const taskFrom = document.getElementById('taskForm')
        
        const ReturnProjectContoller = new projectInputHandler()
        const projectControl = new projectDOMControll(formDisplayGp,taskDisplayGp)
        const taskControl = new taskDOMControll(formDisplayGp,taskDisplayGp)

        const actionButtons = document.querySelectorAll('.add')
        actionButtons.forEach(button => button.addEventListener("click",(event)=>{
            const item = event.target.id
        
            if(item === 'addTasksBtn'){
                //let projects = ReturnProjectContoller.returnProjectInput()
                taskControl.DoTaskDomStuff()
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

    chartPageStart(){
        this.body.innerHTML =""
        
        this.body.classList.remove("homeBody")
        this.body.classList.add("chartBody")

        // Make element and append to the chart
        const chartThree = elementFactory.makeElement("div","","chartThree","")
        const chartFour = elementFactory.makeElement("div","","chartFour","")
        const chartOne = elementFactory.makeElement("div","","chartOne","")
        const chartTwo = elementFactory.makeElement("div","","chartTwo","")
        const stasticsSwitchBtn = elementFactory.makeElement("div","","stasticsSwitchBtn","")
        const stasticsData = elementFactory.makeElement("div","","stasticsData","")

        elementFactory.pushElements(this.body,[chartOne,chartTwo,chartThree,chartFour,stasticsSwitchBtn,stasticsData])

        // Create Two buttons for switch between tasks and project stastics
        const label = elementFactory.makeElement("h2","Switch to","","")
        const tasksStatics = elementFactory.makeElement("div","Tasks","tasks-stastic-btn","tasksStatsicBtn")
        const projectStatics = elementFactory.makeElement("div","Projects","projects-statics-btn","projectStasticsBtn")

        // Testing for chart
        const drawPaper = elementFactory.makeElement("canvas","","","testChart")
        chartOne.append(drawPaper)
        
        let chart = new ChartFactory()
        chart.Barchart()
    }




}


export{DomController}