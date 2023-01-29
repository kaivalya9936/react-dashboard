import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
function PieChart({ chartData }) {
  
  if (!Object.keys(chartData).length) {
    return <div>Loading Pie chart...</div>;
  }
  else{
    const dataValues= chartData.datasets.map(dataset => dataset.data)
    chartData.datasets.data = dataValues
    
    const data = {
      labels : chartData.labels,
      datasets:[
      {
      label : '# of matches :',
      data : dataValues,
      backgroundColor:[
        '#FF6384', '#36A2EB', 
        '#FFCE56', '#4BC0C0',
        '#9966FF', '#F9E79F', 
        '#5DADE2', '#A569BD', 
        '#16A085', '#F4D03F'
      ],
      borderColor: 'rgba(84, 168, 118, 0.7)',
      borderWidth : 2
    }
  ]
}
  return (
    <div>
      <Pie
        data={data}
        options={{
          hoverBackgroundColor: "rgba(84, 108, 118, 0.7)",
          hoverBorderColor:"black",
          hoverBorderWidth:1.5,
          plugins: {
            legend:{
              display:false
            },
            title: {
              display: true,
              text: "Matches Played every year",
              
            }
          }
        }}
      />
    </div>
  )};
}
export default PieChart;