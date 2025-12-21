class Darkmode{

    constructor(){
        this.modeKey = "darkmode"
        this.modeStatus = "active"
    }
  
    enableDarkmode(){
        document.body.classList.add(this.modeKey)
        localStorage.setItem(this.modeKey,this.modeStatus)
    }

    disableDarkmode(){
        document.body.classList.remove(this.modeKey)
        localStorage.setItem(this.modeKey,null)
    }   

}

export{Darkmode}