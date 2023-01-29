import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'tachyons';
import About from './components/About/About';
import './App.css';
import PieChart from './components/Dashboard/PieChart';
import BarChart from './components/Dashboard/BarChart';
import BarChart2 from './components/Dashboard/BarChart2';
import Dropdown from './components/Dropdown/Dropdown';
import Components from './components/Components/Components';
import {Data} from './utils/Options_g3'

function App() {
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState({});
  const [barData2, setBarData2] = useState({});
  const [g3Val, setG3Val] = useState('2008');
  const [barData3, setBarData3] = useState({});
  const [g4Val, setG4Val] = useState('2008')
  const [barData4, setBarData4] = useState({});
  const [g5Val, setG5Val] = useState('2008')
 
  const handleChange = (event) => {
    setG3Val(event.target.value);
  };

  const handleChange2 = (event) => {
    setG4Val(event.target.value);
  };
  const handleChange3 = (event) => {
    setG5Val(event.target.value);
  };

  useEffect(() => {
    async function fetchDataG1() {
      try {
        const response = await fetch('http://localhost:8000/landing-graph-1/', {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const chartData1 = Object.values(data).map(item => ({
          label:"# of matches in:"+ item['season'],
          data: item['count']
        }));
        setPieData({
          labels: Object.values(data).map(item => item['season']),
          datasets: chartData1
        });
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchDataG2() {
      try {
        const response = await fetch('http://localhost:8000/landing-graph-2/', {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const team_names= data.slice(10,11);
        const teams_array = Object.values(team_names)[0]
        const teams = teams_array['team_names'];
        const wins_data = data.slice(0,-1)
        const chartData1 = Object.values(wins_data).map(item => ({
        label: item['season'],
        data: item['count'],
       
        }));
        setBarData({
          labels: teams,
          datasets: chartData1,

        });
      } catch (error) {
        console.error(error);
      }
    }
    
     fetchDataG1();
     fetchDataG2();
  }, []);

  useEffect(()=>{
    async function fetchDataG3() {
      try {
        const response = await fetch('http://localhost:8000/extra-runs-per-team/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'       
              },
            body: JSON.stringify({
                year: g3Val
            })
        });
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const team = Object.values(data).map(item=> item['bowling_team'])
        const data_extra = Object.values(data).map(item=>item['total_extra_runs'])
        const dataset = [
          {
            label : g3Val,
            data : data_extra
          }
        ]
        setBarData2({
          labels: team,
          datasets: dataset,
        });

      } catch (error) {
        console.error(error);
      }
    }
    fetchDataG3();

  },[g3Val])

  useEffect(()=>{
    async function fetchDataG4() {
      try {
        const response = await fetch('http://localhost:8000/won-vs-played/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'       
              },
            body: JSON.stringify({
                year: g4Val
            })
        });    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const team = Object.values(data).map(item=> item['team'])
        const matches_played = Object.values(data).map(item=>item['matches_played'])
        const matches_won = Object.values(data).map(item=>item['matches_won'])
        
        const dataset = [
          {
            label : 'Matches played',
            data : matches_played
          },
          {
            label : 'Matches won',
            data : matches_won
          }          
        ]
        setBarData3({
          labels: team,
          datasets: dataset,
        });

      } catch (error) {
        console.error(error);
      }
    }
    fetchDataG4();

  },[g4Val])

  useEffect(()=>{
    async function fetchDataG5() {
      try {
        const response = await fetch('http://localhost:8000/top-bowlers/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'       
              },
            body: JSON.stringify({
                year: g5Val
            })
        });    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const bowler = Object.values(data).map(item=> item['bowler'])
        const economy = Object.values(data).map(item=>item['economy'])
        
        const dataset = [
          {
            label : g5Val,
            data : economy
          }          
        ]
        setBarData4({
          labels: bowler,
          datasets: dataset,
        });

      } catch (error) {
        console.error(error);
      }
    }
    fetchDataG5();

  },[g5Val])

  return (
    <div className='bg-navy' id="div1">
      <Router>
        <nav className='mw10 center bg-light-blue pa2 ph4-ns br3 shadow-3 mb3'>
          <div className='flex items-center'>
            <Link className='pv1-ns f3 fw6 dim link black-70 mr2 mr3-m mr4-1 link dib' to="/">Dashboard</Link>
            <Link className='pv1-ns f3 fw6 dim link black-70 mr2 mr3-m mr4-1 dib' to="/about">About</Link>
            <Link className='pv1-ns f3 fw6 dim link black-70 mr2 mr3-m mr4-1 dib' to="/components">Components</Link>
          </div>
        </nav>
        <Routes>
        <Route path="/" element={
          <div>
            <div className='bg-navy' style={{display: 'flex', justifyContent: 'center', alignItems: 'top', width: '100%', height: '500%'}}>
              <div className='flex dib'style={{height:'100%', width:'100%'}}>
              <div >
                <PieChart style={{width:'100%', height:'100%'}} chartData={pieData} />
              </div>
              <div style={{width: '100%', height: '150%'}}>
                <BarChart chartData={barData}/>
              </div>
              <div style={{width: '100%', height: '100%'}}>
                <Dropdown label="Select year" options={Data} value={g3Val} onChange={handleChange}/>
                 <BarChart2 year={g3Val} title='Extra runs conceded in ' chartData={barData2}/>
                </div>
            </div>
            </div>
            <div className='bg-navy flex ' style={{width: '100%', height: '10%'}}>
            <div  style={{width: '40%'}} id='bardiv'>
              <Dropdown label="Select year" options={Data} value={g4Val} onChange={handleChange2}/>
              <BarChart2 year={g4Val} title='Matches played vs won in ' chartData={barData3}/>
              </div>
              <div style={{width: '40%', height: '30%'}}>
              <Dropdown label="Select year" options={Data} value={g5Val} onChange={handleChange3}/>
              <BarChart2 year={g5Val} title='Top 10 economical bowlers in ' chartData={barData4}/>
              </div>
            </div>
          </div>
        }/>
        <Route path="/about" element={<About />} />
        <Route path="/components" element={<Components />} />
      </Routes>
      </Router>
    </div>
  );
  
}

export default App;
