import { taskInputHandle } from "./taskInputHandler";
import { DateHelper } from "./dateHelper";

class TaskStatcis{
    constructor(){
        this.tasks = taskInputHandle.returnTaskInput()
        this.completeTasks = taskInputHandle.returnCompleteTask()
        this.softDeleteTasks = taskInputHandle.returnSoftDeleteTask()
    }

    OverViewAnalysis(){
       const stats = {
            total: this.tasks.length,
            completed: this.completeTasks.length,
            softDeleted: this.softDeleteTasks.length,
       }

       stats.active = stats.total - stats.completed - stats.softDeleted;

       return{
        labels: [
            "Total Tasks",
            "Completed Tasks",
            "Active Tasks",
            "Soft-deleted Tasks"
        ],

        data:Object.values(stats)
        }
    }

    importantLevelAnalysis(){
        // Grouping the task by the important level
        const taskLevelGroups = Object.groupBy(this.tasks,({taskImportantLevel}) => taskImportantLevel)

    const stats = {
            chill : taskLevelGroups.chill.length,
            important: taskLevelGroups.Important.length,
            urgent: taskLevelGroups.Urgent
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
