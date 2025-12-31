class projectInputHandler{
    constructor(){
        this.projectStorage = [
            // {
            //     projectName: "Odin Project",
            //     ProjectImportantLevel: "Chill",
            //     projectDueDate: "12/26/2026"
            // },
            // {
            //     projectName: "CS50",
            //     ProjectImportantLevel: "Urgent",
            //     projectDueDate: "11/12/2026"
            // },

            // {
            //     projectName: "Personal Portfolio",
            //     ProjectImportantLevel: "Urgent",
            //     projectDueDate: "01/15/2026"
            // },
            // {
            //     projectName: "E-Commerce Dashboard",
            //     ProjectImportantLevel: "Medium",
            //     projectDueDate: "02/20/2026"
            // },
            // {
            //     projectName: "AI Chatbot Integration",
            //     ProjectImportantLevel: "Urgent",
            //     projectDueDate: "03/10/2026"
            // },
            // {
            //     projectName: "Habit Tracker App",
            //     ProjectImportantLevel: "Chill",
            //     projectDueDate: "04/05/2026"
            // },
            // {
            //     projectName: "Recipe Finder API",
            //     ProjectImportantLevel: "Medium",
            //     projectDueDate: "05/18/2026"
            // }

 ]

        // To store delete project
        this.softDeleteProject = []

        // To store complete project
        this.completeProject = []
    }

    getProjectInput(form){
        
        let projectName = form.querySelector('.project-input').value.trim()
        
        let ProjectImportantLevel = form.querySelector('.important-option').value.trim()

        // Handle due date

        let projectDueDate = form.querySelector('.project-duedate').value 
        
        // let today = Date.today().toLocalDateString()


        const project = {
            id: crypto.randomUUID(),
            projectName,
            ProjectImportantLevel,
            projectDueDate
        }

        this.projectStorage.push(project)

        // For deduging
        console.log(this.projectStorage)
    }


    returnProjectInput(){
        return [...this.projectStorage]
    }


        restore(project){
            let index = this.softDeleteProject.findIndex( x => x.id == project.id)   
            if(index === -1) return
            const restoredProject = this.softDeleteProject.splice(index,1)[0]
            this.projectStorage.push(restoredProject)
        }

        remove(project){
            let index = this.projectStorage.findIndex(x => x.id == project.id)
            if(index === -1) return
            
            let removeObject = this.projectStorage.splice(index,1)[0]
            this.softDeleteProject.push(removeObject)
            console.log(this.softDeleteProject)
        }

        complete(project){

           const index = this.projectStorage.findIndex(x => x.id == project.id)
           if(index === -1) return

           const removed = this.projectStorage.splice(index,1)[0]
            this.completeProject.push(removed)

            console.log(this.completeProject)
        }


        uncomplete(project) {
            const index = this.completeProject.findIndex(x => x.id == project.id)
            if(index === -1) return

            const removed = this.completeProject.splice(index,1)[0]
            this.projectStorage.push(removed)
            console.log(this.completeProject)
        }

        deletePermanent(project){
            let index = this.softDeleteProject.findIndex(x => x.id == project.id)
            this.softDeleteProject.splice(index,1)
        }


}

export const projectReturn = new projectInputHandler()
export {projectInputHandler}