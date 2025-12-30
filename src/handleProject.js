class projectInputHandler{
    constructor(){
        this.projectStorage = [
            {
                projectName: "Odin Project",
                ProjectImportantLevel: "Chill",
                projectDueDate: "12/26/2026"
            },
            {
                projectName: "CS50",
                ProjectImportantLevel: "Urgent",
                projectDueDate: "11/12/2026"
            },
        ]
    }

    getProjectInput(form){
        
        let projectName = form.querySelector('.project-input').value.trim()
        
        let ProjectImportantLevel = form.querySelector('.important-option').value.trim()

        // Handle due date

        let projectDueDate = form.querySelector('.project-duedate').value 
        
        // let today = Date.today().toLocalDateString()


        const project = {
            projectName,
            ProjectImportantLevel,
            projectDueDate
        }

        this.projectStorage.push(project)

        // For deduging
        console.log(this.projectStorage)
    }


    returnProjectInput(){
        let returnProject = []

        for(let i = 0; i < this.projectStorage.length; i++){
            returnProject.push(Object.values(this.projectStorage[i]))
        }

        return returnProject
    }


}

export const projectReturn = new projectInputHandler()
export {projectInputHandler}