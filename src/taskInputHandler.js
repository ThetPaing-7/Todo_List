class TaskInputHandler{

    constructor(){
        this.taskStorage = [
        {
            id: "550e8400-e29b-41d4-a716-446655440000",
            taskName: "Refactor Authentication Logic",
            projectName: "E-Commerce Suite",
            taskImportantLevel: "Chill",
            dueDate: "2026-02-15"
        },
        {
            id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            taskName: "Update Brand Guidelines",
            projectName: "Marketing Q1",
            taskImportantLevel: "Urgent",
            dueDate: "2026-01-30"
        },
        {
            id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
            taskName: "Database Schema Migration",
            projectName: "Cloud Migration",
            taskImportantLevel: "Important",
            dueDate: "2026-01-25"
        },
        {
            id: "747230c9-8132-4934-8041-9df613d5f992",
            taskName: "Schedule Team Onboarding",
            projectName: "HR Operations",
            taskImportantLevel: "Urgent",
            dueDate: "2026-02-10"
        },
        {
            id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
            taskName: "Fix Responsive Layout Bugs",
            projectName: "Mobile App v2",
            taskImportantLevel: "Chill",
            dueDate: "2026-01-28"
        },
        {
            id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            taskName: "Write Unit Tests for API",
            projectName: "Backend Core",
            taskImportantLevel: "Important",
            dueDate: "2026-02-05"
        },
        {
            id: "d9b2d63d-a233-41a9-a3fc-123456789abc",
            taskName: "Conduct User Interviews",
            projectName: "UX Research",
            taskImportantLevel: "Important",
            dueDate: "2026-02-12"
        },
        {
            id: "98765432-abcd-1234-efgh-567890abcdef",
            taskName: "Optimize Image Assets",
            projectName: "Landing Page",
            taskImportantLevel: "Important",
            dueDate: "2026-02-20"
        },
        {
            id: "bcdefabc-1234-5678-90ab-cdefabcdef12",
            taskName: "Draft Security Protocol",
            projectName: "Compliance 2026",
            taskImportantLevel: "Urgent",
            dueDate: "2026-01-22"
        },
        {
            id: "2468ace0-1357-9bdf-8642-0123456789ab",
            taskName: "Set Up CI/CD Pipeline",
            projectName: "DevOps Setup",
            taskImportantLevel: "Chill",
            dueDate: "2026-02-01"
        }
        ]
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

        // Return how many tasks, how many deleted task and soft delete task
        returnTaskInput(){    
            return [...this.taskStorage]
        }

        returnSoftDeleteTask(){
            return[...this.softDeleteTask]
        }

        returnCompleteTask(){
            return[...this.completeTask]
        }
    }

const taskInputHandle = new TaskInputHandler()
export {taskInputHandle}