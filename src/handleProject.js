class projectInputHandler{
    constructor(){
        this.projectStorage = [
    { id: "123-456-783-343", projectName: "Odin Project", ProjectImportantLevel: "Chill", projectDueDate: "2026-02-20" },
    { id: "234-567-234-123", projectName: "CS50", ProjectImportantLevel: "Urgent", projectDueDate: "2026-02-20" },
    { id: "234-643-456-789", projectName: "Personal Portfolio", ProjectImportantLevel: "Urgent", projectDueDate: "2026-02-20" },
    { id: "234-641-356-789", projectName: "E-Commerce Dashboard", ProjectImportantLevel: "Important", projectDueDate: "2026-02-20" },
    // New projects added from taskStorage
    { id: "prj-550e-8400", projectName: "E-Commerce Suite", ProjectImportantLevel: "Chill", projectDueDate: "2026-02-15" },
    { id: "prj-1b9d-6bcd", projectName: "Marketing Q1", ProjectImportantLevel: "Urgent", projectDueDate: "2026-01-30" },
    { id: "prj-6ec0-bd7f", projectName: "Cloud Migration", ProjectImportantLevel: "Important", projectDueDate: "2026-01-25" },
    { id: "prj-7472-30c9", projectName: "HR Operations", ProjectImportantLevel: "Urgent", projectDueDate: "2026-02-10" },
    { id: "prj-a1b2-c3d4", projectName: "Mobile App v2", ProjectImportantLevel: "Chill", projectDueDate: "2026-01-28" },
    { id: "prj-f47a-c10b", projectName: "Backend Core", ProjectImportantLevel: "Important", projectDueDate: "2026-02-05" },
    { id: "prj-d9b2-d63d", projectName: "UX Research", ProjectImportantLevel: "Important", projectDueDate: "2026-02-12" },
    { id: "prj-9876-5432", projectName: "Landing Page", ProjectImportantLevel: "Important", projectDueDate: "2026-02-20" },
    { id: "prj-bcde-fabc", projectName: "Compliance 2026", ProjectImportantLevel: "Urgent", projectDueDate: "2026-01-22" },
    { id: "prj-2468-ace0", projectName: "DevOps Setup", ProjectImportantLevel: "Chill", projectDueDate: "2026-02-01" }
];

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

    retrunCompleteProject(){
        return[...this.completeProject]
    }

    returnSoftDeleteProject(){
        return[...this.softDeleteProject]
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

        removeFromCompletetask(project){
            const index = this.completeProject.findIndex(x => x.id == project.id)
            if(index === -1) return

            const removed = this.completeProject.splice(index,1)[0]
            this.softDeleteProject.push(removed)
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

const projectInputHandle = new projectInputHandler()
export const projectReturn = new projectInputHandler()
export {projectInputHandle}