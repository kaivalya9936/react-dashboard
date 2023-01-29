import React from "react";
import './About.css';

function About() {
  return (
    <div>
    <h1 >About</h1>
    <p className="flex items-center">
    This project is a simple dashboard built with React , SQLite, and Django.
    It features a basic navigation bar that uses React Router's Route and Link components to navigate between different pages.
    The main focus of the dashboard is to display a bar chart and a pie chart, both of which are built using the BarChart and PieChart components from the popular react-chartjs-2 library. The data used to populate these charts is stored in a SQLite database and is accessed using Django's ORM. 
    The project serves as a demonstration of how to create a simple dashboard using these technologies, 
    and it can be used as a starting point for building more complex dashboards in the future.
    </p>
    <h2>Database Schema</h2>
    <p className="flex items-center">
    This dashboard uses a database schema with two tables: "Matches" and "Deliveries". 
    The "Matches" table contains information about the match such as match_id, season, city, date, teams playing, toss winner, result, and other details. 
    The "Deliveries" table contains information about the deliveries in a match such as the delivery id, inning, batting team, 
    bowling team, batsman, bowler, runs, and other details. The database schema has been implemented using Django ORM.
    The match_id from the Matches table is used as the foreign key in the Deliveries table.
    </p>
    </div>
  );
}

export default About;