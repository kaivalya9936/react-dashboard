import React from "react";
import './Components.css'

const Components=() =>{
    return(
    <div>
    <h2>Components explained</h2>
    <p className='flex items-left'>
    <ul>
      <li> About - This is the component for the about page.</li>
      <li> Components - This is the page for this current page which explains the components used.</li>
      <li> PieChart - This is the pie chart from react-chartjs-2 which is used to plot the chart for the number of games played every year</li>
      <li> BarChart - This is a stacked horizontal bar graph from react-chartjs-2 which is the landing page's IInd graph.</li>
      <li> BarChart2 - This is the component which is used to plot the rest of the 3 graphs. It is a vertical graph from react-chartjs-2</li>
    </ul>
    </p>
    </div>
    );
}
export default Components