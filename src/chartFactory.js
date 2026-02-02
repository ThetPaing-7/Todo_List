// import { 
//   Chart, 
//   ArcElement,  
//   DoughnutController,    // For Doughnut
//   BarElement,      // For Bar
//   BarController,   // For Bar
//   CategoryScale,   // For Bar X-axis
//   LinearScale,     // For Bar Y-axis (The one causing your error)
//   Tooltip, 
//   Legend 
// } from 'chart.js';

// // Register the components
// Chart.register(
//   DoughnutController,
//   ArcElement, 
//   BarElement, 
//   BarController, 
//   CategoryScale, 
//   LinearScale, 
//   Tooltip, 
//   Legend
// );

import Chart, { plugins } from 'chart.js/auto';

class ChartFactory{

    constructor(){
        
    }

    Barchart(canvas,labels,data){
        new Chart(canvas, {
            type: 'bar',
            data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor:[
                    'rgba(52, 58, 174, 0.953)',
                    'rgba(52, 174, 62, 0.95)',
                    'rgba(228, 79, 223, 0.95)',
                    'rgba(174, 52, 52, 0.95)',

                ],
                borderWidth: 1
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
    }

    DoughnutChart(canvas,label,data){
        new Chart(canvas,{
            type: 'doughnut',
            data: {
        labels: label,
        datasets: [{
                label: label,
                //indexAxis: 'y',
                data: data,
                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
                ],
                borderColor: [
                    'rgb(47, 35, 38)',
                    'rgb(96, 84, 72)',
                    'rgb(122, 110, 84)',
                ],
                borderWidth: 1
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                title: {
                    display: true,
                    text: "Group By the Important Level"
                },
                legend: {
                    position: 'right',
                },
                },
                scales: {
                y: {
                beginAtZero: true
                },
            },
            },
        })
    }

    lineChart(canvas,label,data){
        new Chart(canvas,{
            type: 'line',
            data: {
                labels: label,
                datasets:[{
                    label: "By Dates",
                    data: data
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                title: {
                    display: true,
                    text: "Group By Due date"
                },
                },
            }
        })
    }
}

const ChartObject = new ChartFactory()

export{ChartFactory, ChartObject}