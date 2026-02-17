import "./style.css"
import { DomController } from "./domStuff"

const testApp = new DomController()

function start(){
    // Control light and dark mode
    testApp.themeController()
    // Start the homepage
    testApp.homePageStart()
    const homeStartBtn = document.getElementById("home")
    homeStartBtn.addEventListener("click",() =>{
        testApp.homePageStart()
    })
    // Start the chart page
    const chartStartBtn = document.getElementById("chart")
    chartStartBtn.addEventListener("click",() =>{
        testApp.chartPageStart()
    })  
}

start()