# IPL Dashboard
This project is a simple dashboard built with React , SQLite, and Django. It features a basic navigation bar that uses React Router's Route and Link components to navigate between different pages. The main focus of the dashboard is to display a bar chart and a pie chart, both of which are built using the BarChart and PieChart components from the popular react-chartjs-2 library. The data used to populate these charts is stored in a SQLite database and is accessed using Django's ORM. The project serves as a demonstration of how to create a simple dashboard using these technologies, and it can be used as a starting point for building more complex dashboards in the future.

## Database Schema
This dashboard uses a database schema with two tables: "Matches" and "Deliveries". The "Matches" table contains information about the match such as match_id, season, city, date, teams playing, toss winner, result, and other details. The "Deliveries" table contains information about the deliveries in a match such as the delivery id, inning, batting team, bowling team, batsman, bowler, runs, and other details. The database schema has been implemented using Django ORM. The match_id from the Matches table is used as the foreign key in the Deliveries table.

## Components used

* About - This is the component for the about page.
* Components - This is the page for this current page which explains the components used.
* PieChart - This is the pie chart from react-chartjs-2 which is used to plot the chart for the number of games played every year
* BarChart - This is a stacked horizontal bar graph from react-chartjs-2 which is the landing page's IInd graph.
* BarChart2 - This is the component which is used to plot the rest of the 3 graphs. It is a vertical graph from react-chartjs-2

## Getting started
Clone the repo and open a terminal in that folder.

### Backend

Run the following commands in the terminal

``` 
cd backend

./env/Scripts/activate

python manage.py runserver

```

### Frontend
Open a new terminal in the cloned repository folder
Run the following commands to start the frontend:

```
cd frontend

npm install

npm start

```

## Demo

Copy and paste this link to your browser to view a video demo of the web app in action:

https://drive.google.com/file/d/1p4COz9lysLGOnv7ZQq0NHND2N6D-giPG/view?usp=sharing

