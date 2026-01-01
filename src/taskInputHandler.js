class TaskInputHandler{

    constructor(){
        this.taskStorage = []
        this.softDeleteTask = []
        this.completeTask = []
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
            id : crypto.randomUUID(),
            taskName,
            projectName,
            taskImportantLevel,
            dueDate
        }
        
        this.taskStorage.push(task)
        
    }

    returnTaskInput(){    
        return [...this.taskStorage]
    }


    restore(task){
            let index = this.softDeleteTask.findIndex( x => x.id == task.id)   
            if(index === -1) return
            const restoredTask = this.softDeleteTask.splice(index,1)[0]
            this.taskStorage.push(restoredTask)
    }

        remove(task){
            let index = this.taskStorage.findIndex(x => x.id == task.id)
            if(index === -1) return
            
            let removeObject = this.taskStorage.splice(index,1)[0]
            this.softDeleteTask.push(removeObject)
        }

        removeFromCompletetask(task){
            const index = this.completeTask.findIndex(x => x.id == task.id)
            if(index === -1) return

            const removed = this.completeTask.splice(index,1)[0]
            this.softDeleteTask.push(removed)
        }

        complete(task){

           const index = this.taskStorage.findIndex(x => x.id == task.id)
           if(index === -1) return

           const removed = this.taskStorage.splice(index,1)[0]
           this.completeTask.push(removed)
        }


        uncomplete(task) {
            const index = this.completeTask.findIndex(x => x.id == task.id)
            if(index === -1) return

            const removed = this.completeTask.splice(index,1)[0]
            this.taskStorage.push(removed)
        }

        deletePermanent(task){
            let index = this.softDeleteTask.findIndex(x => x.id == task.id)
            this.softDeleteTask.splice(index,1)
        }
}

const taskInputHandle = new TaskInputHandler()
export {taskInputHandle}