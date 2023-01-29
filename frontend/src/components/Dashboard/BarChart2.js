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
import { Colors} from 'chart.js';

ChartJS.register(Colors);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
function BarChart2({ title,year, chartData }) {
    if (!Object.keys(chartData).length) {
        return <div>Loading Bar chart...</div>;
      }
      else{

        const options = {
            hoverBorderColor:"white",
            hoverBorderWidth:2.5,
            indexAxis:'x',
            plugins: {
                colors: {
                    enabled: true,
                    forceOverride :true
                  },
              title: {
                display: true,
                text: title + year,
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
            }
         },
         y: {
            font:{
                size:2,
            },
            grid:{
                offset: true
            }
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


export default BarChart2;
