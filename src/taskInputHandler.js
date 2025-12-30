class TaskInputHandler{

    constructor(){
        this.taskStorage = []
    }

    getTaskInput(form){
        let taskName = form.querySelector('.task-input').value.trim()

        let projectName = form.querySelector('.project-option').value.trim()
        let taskImportantLevel = form.querySelector('.important-option').value.trim()

        // Handle due date
       let dueDate = form.querySelector('.task-duedate').value 

        //     // Debugging: Log these to see which one is null
        // console.log("Input:", inputEl, "Level:", levelEl, "Date:", dateEl);

        // if (!inputEl || !levelEl || !dateEl) {
        //     console.error("One or more project form elements were not found in the DOM.");
        //     return;
        // }

        // let today = Date.today().toLocalDateString()

        
    
        const task = {
            taskName,
            projectName,
            taskImportantLevel,
            dueDate
        }
        
        this.taskStorage.push(task)
        
    }

    returnTaskInput(){
        let returnTasks = []
        for(let i = 0; i < this.taskStorage.length; i++){
            returnTasks.push(Object.values(this.taskStorage[i]))
        }
    
        return returnTasks;
    }


}

const taskInputHandle = new TaskInputHandler()
export {taskInputHandle}