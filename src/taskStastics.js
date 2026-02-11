import { taskInputHandle } from "./taskInputHandler";
import { DateHelper } from "./dateHelper";
import { projectInputHandle } from "./handleProject";

class Statcis{
    constructor(tasks, completeTasks, softDeleteTasks){
        this.tasks = tasks,
        this.completeTasks = completeTasks,
        this.softDeleteTasks = softDeleteTasks,
        this.totalTasks = this.tasks.length + this.completeTasks.length + this.softDeleteTasks.length
    }

    taskStastics(){
        const total = this.totalTasks;
        const active = total - (this.completeTasks + this.softDeleteTasks)

        if(total == 0){
            return{completePercentage: 0, uncompletePercentage: 0}
        }

        const completePercentage = Math.round(
            (this.completeTasks.length / total ) * 100
        )

        const uncompletePercentage = 100 - completePercentage
        
        return{completePercentage,uncompletePercentage}
    }

    OverViewAnalysis(){
       const stats = {
            total: this.totalTasks,
            completed: this.completeTasks.length,
            softDeleted: this.softDeleteTasks.length,
       }

       stats.active = stats.total - (stats.completed + stats.softDeleted);

       return{
        labels: [
            "Total Tasks",
            "Completed Tasks",
            "Soft-deleted Tasks",
            "Active Tasks",
        ],

        data:Object.values(stats)
        }
    }

    importantLevelAnalysis(){
        // Grouping the task by the important level
    const Groups = Object.groupBy(this.tasks,(item) => item.ProjectImportantLevel || item.taskImportantLevel )

    const stats = {
            Chill : Groups.Chill?.length ?? 0,
            Important: Groups.Important?.length ?? 0,
            Urgent: Groups.Urgent?.length ?? 0
        }

        return{
            labels: [
                "Chill",
                "Important",
                "Urgent"
            ],

            data: Object.values(stats)
        }
    }

    projectWiseAnalysis(){
        let returnValue = Object.values(this.tasks.reduce((acc, task) => {
            const { projectName } = task
            if(!acc[projectName]){
                acc[projectName] = { name: projectName, count: 0}
            }
            acc[projectName].count++
            return acc
        },{}))

        let label = []
        let data = []

        for(let i = 0; i < returnValue.length; i++){
            label.push(returnValue[i].name)
            data.push(returnValue[i].count)
        }

        return {label,data}
        
    }


    test(){
        return(
             [1,2]
        )   
           
    }

    dueDateBasesAnalysis(){
        const today = new Date();

        const stats = {
            overdue: 0,
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            future: 0,
        }

        this.tasks.forEach( task => {
            let due = task.dueDate || task.projectDueDate
            if(!due || task.stats === "complete") return;

            const dueDate = new Date(task.dueDate)

            if(dueDate < today && !DateHelper.IsSameDay(dueDate,today)){
                stats.overdue++;
            }else if(DateHelper.IsSameDay(dueDate, today)){
                stats.today++
            }else if(DateHelper.IsThisWeek(dueDate, today)){
                stats.thisWeek++
            }else if(DateHelper.IsThisMonth(dueDate, today)){
                stats.thisMonth++
            }else{
                stats.future++
            }
        })

    return {
        labels: [
            "Overdue",
            "Due Today",
            "This Week",
            "This Month",
            "Future"
        ],
        data: Object.values(stats)
    };

    }
    
}

export {Statcis}
