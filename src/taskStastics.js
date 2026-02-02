import { taskInputHandle } from "./taskInputHandler";
import { DateHelper } from "./dateHelper";

class Statcis{
    constructor(tasks, completeTasks, softDeleteTasks){
        this.tasks = tasks,
        this.completeTasks = completeTasks,
        this.softDeleteTasks = softDeleteTasks,
        this.totalTasks = this.tasks.length + this.completeTasks.length + this.softDeleteTasks.length
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
    const taskLevelGroups = Object.groupBy(this.tasks,({taskImportantLevel}) => taskImportantLevel)

    const stats = {
            Chill : taskLevelGroups.Chill.length,
            Important: taskLevelGroups.Important.length,
            Urgent: taskLevelGroups.Urgent.length
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
        const taskGroupByProject = Object.groupBy(this.tasks,({projectName}) => projectName )

        return{
            value: Object.keys(taskGroupByProject),
            data: Object.values(taskGroupByProject)
        }
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
            if(!task.dueDate || task.stats === "complete") return;

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
