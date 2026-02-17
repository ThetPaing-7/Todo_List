import { elementFactory } from "./elementFactory"
import { Darkmode } from "./switchTheme"
import { taskDOMControll } from "./taskController"
import { projectDOMControll } from "./projectController"
import { projectInputHandle } from "./handleProject"
import { ChartFactory } from "./chartFactory"
import { Statcis } from "./taskStastics"
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
        const complete = elementFactory.makeElement("button","Complete...","complete-Btn","completeDisplayBtn")
        const deleteTask = elementFactory.makeElement("button","Delete...","delete-display-Btn","deleteDisplayBtn")

        elementFactory.pushElements(DisplayGp,[todo,complete,deleteTask])
        
        const taskDisplayGp = elementFactory.makeElement("div","","taskDisplayGp","")
        elementFactory.pushElements(DisplayGp, [taskDisplayGp])

        elementFactory.pushElements(this.body,[recordBody,formDisplayGp,DisplayGp])

        const addTasks = elementFactory.makeElement("button","Add Task","add task","addTasksBtn")
        const addProjects = elementFactory.makeElement("button","Add Project","add project","addProjectsBtn")

        elementFactory.pushElements(recordBody,[addTasks,addProjects])

        const taskFrom = document.getElementById('taskForm')
        
        //const ReturnProjectContoller = new projectInputHandle()
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
        const tasksStatics = elementFactory.makeElement("button","Tasks","tasks-stastic-btn","tasksStatsicBtn")
        const projectStatics = elementFactory.makeElement("button","Projects","projects-statics-btn","projectStasticsBtn")
        
        elementFactory.pushElements(stasticsSwitchBtn,[label,tasksStatics,projectStatics])

        
        stasticsSwitchBtn.addEventListener("click",(event) => {
            
            
            if(event.target.tagName != "BUTTON") return
            let names = [stasticsData,chartOne,chartTwo,chartThree,chartFour]
            
            switch(event.target.id){
                case "tasksStatsicBtn":


                // clean the charts
                //let names = [chartOne,chartTwo,chartThree,chartFour]
                for(let i = 0; i < names.length; i++){
                    names[i].innerHTML = ""
                }

                let taskChart = new ChartFactory()
                console.log("Task Has been switch")

                let tasks = taskInputHandle.returnTaskInput()
                let completeTasks = taskInputHandle.returnCompleteTask()
                let softDeleteTasks = taskInputHandle.returnSoftDeleteTask()

                const stasticTaskObject = new Statcis(tasks,completeTasks,softDeleteTasks)

                // to display percentage
                const{completePercentage: complete = 0,uncompletePercentage: uncomplete = 0} = stasticTaskObject.taskStastics()
                let completeRateHolder = elementFactory.makeElement("div","Complete Rate :","complete-rate-holder","")
                let completeRate = elementFactory.makeElement("div",complete,"complete-rate","")
                
                let uncompleteRateHolder = elementFactory.makeElement("div","Uncomplete Rate :","uncomplete-rate-holder","")
                let uncompleteRate = elementFactory.makeElement("div",uncomplete,"uncomplete-rate","")
                
                elementFactory.pushElements(stasticsData,[completeRateHolder,completeRate,uncompleteRateHolder,uncompleteRate])

                this.StaticsStart(chartOne,chartTwo,chartThree,chartFour,stasticTaskObject,taskChart)

                break;
            
            case "projectStasticsBtn":
                for(let i = 0; i < names.length; i++){
                    names[i].innerHTML = ""
                }
                console.log("Project has been switched")
                let projectChart = new ChartFactory()
                let projects = projectInputHandle.returnProjectInput()
                let completeProject = projectInputHandle.retrunCompleteProject()
                let softDeleteProject = projectInputHandle.returnSoftDeleteProject()

                const stasticProjectObject = new Statcis(projects,completeProject,softDeleteProject)

                // to display percentage
                const{completePercentage: projectComplete = "0",uncompletePercentage: projectUncomplete = "0"} = stasticProjectObject.taskStastics()
                let projectCompleteRateHolder = elementFactory.makeElement("div","Complete Rate: ","complete-rate-holder","")
                let projectCompleteRate = elementFactory.makeElement("div",projectComplete,"complete-rate","")
                
                let projectUncompleteRateHolder = elementFactory.makeElement("div","Uncomplete Rate: ","uncomplete-rate-holder","")
                let projectUncompleteRate = elementFactory.makeElement("div",projectUncomplete,"uncomplete-rate","")
                
                elementFactory.pushElements(stasticsData,[projectCompleteRateHolder,projectCompleteRate,projectUncompleteRateHolder,projectUncompleteRate])


                this.StaticsStart(chartOne,chartTwo,chartThree,chartFour,stasticProjectObject,projectChart)
                break;
            
            default:
                console.log("Hello")
                break;
            }
        
        })
        // Chart Initialize
        // Testing for chart
        }

    StaticsStart(chartOne,chartTwo,chartThree,chartFour,stasticObject,chart){

        // Overview Stastic
        const drawPaperOne = elementFactory.makeElement("canvas","","chart-container","")
        chartOne.append(drawPaperOne)
        const { labels : labelOfChart, data: dataOfChart } = stasticObject.OverViewAnalysis()
        console.log(labelOfChart,dataOfChart)
        chart.Barchart(drawPaperOne, labelOfChart, dataOfChart,"x")

        const drawPaperTwo = elementFactory.makeElement("canvas","","chart-container","")
        chartThree.append(drawPaperTwo)
        const{labels: labelOfPriority, data: dataOfPriority} = stasticObject.importantLevelAnalysis()
        console.log(labelOfPriority,dataOfPriority)
        chart.DoughnutChart(drawPaperTwo,labelOfPriority,dataOfPriority)

        const drawPaperThree = elementFactory.makeElement("canvas","","chart-container","")
        chartFour.append(drawPaperThree)
        const{labels: labelOfDueBaseAnalysis, data: dataOfDueBaseAnalysis} = stasticObject.dueDateBasesAnalysis()
        console.log(labelOfPriority,dataOfPriority)
        chart.Barchart(drawPaperThree,labelOfDueBaseAnalysis,dataOfDueBaseAnalysis,"y")
        
        const drawPaperFour = elementFactory.makeElement("canvas","","chart-container","")
        chartTwo.append(drawPaperFour)
        const{label: labelOfProjectGroupBy, data: dataOfProjectGroupBy} = stasticObject.projectWiseAnalysis()
        console.log(labelOfProjectGroupBy,dataOfProjectGroupBy)
        chart.lineChart(drawPaperFour,labelOfProjectGroupBy,dataOfProjectGroupBy)
        
        // Important Level Stastice
    }






}


export{DomController}