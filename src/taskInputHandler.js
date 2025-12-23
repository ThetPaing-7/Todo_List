class TaskInputHandler{

    constructor(){
        this.taskStorage = []
    }

    getTaskInput(){
        let taskName = document.getElementById('taskInput').value.trim()
        let projectName = document.getElementById('ProjectOptions').value.trim()
        let taskImportantLevel = document.getElementById('levelOptions').value.trim()

        // Handle due date
        let dueDate = document.getElementById('dDate').value 
        // let today = Date.today().toLocalDateString()


        const task = {
            taskName,
            projectName,
            taskImportantLevel,
            dueDate
        }
        
        this.taskStorage.push(task)
        
        console.log(this.taskStorage[0].taskName)
        console.log(this.taskStorage[0].projectName)
        console.log(this.taskStorage[0].taskImportantLevel)
        console.log(this.taskStorage[0].dueDate)
    }

    returnTaskInput(){
        let returnTasks = []
        for(let i = 0; i < this.taskStorage.length; i++){
            returnTasks.push(Object.values(this.taskStorage[i]))
        }
    
        return returnTasks;
    }


}

export {TaskInputHandler}