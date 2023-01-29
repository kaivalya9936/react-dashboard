import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,} from 'chart.js';
import 'chart.js/auto';
import { Colors } from 'chart.js';

ChartJS.register(Colors);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
function BarChart({ chartData }) {
    if (!Object.keys(chartData).length) {
        return <div>Loading Pie chart...</div>;
      }
      else{

        const options = {
            hoverBorderColor:"black",
            hoverBorderWidth:1.5,
            indexAxis:'y',
            plugins: {
                colors: {
                    enabled: true,
                  },
              title: {
                display: true,
                text: 'Matches won every year',
                color: 'rgba(84, 168, 118, 0.7)'
              },
              legend: { 
                display: false 
            }
            },
        scales: {
         x: {
            grid:{
                offset: true,
            },
            stacked: true 
         },
         y: {
            font:{
                size:2,
            },
            grid:{
                offset: true
            },
            stacked: true 
         }
        },
        responsive: true,
        maintainAspectRatio: true
        };
          
        return (
            <Bar
                data={chartData}
                options={options}
            />
    )
    }
}


export default BarChart;
