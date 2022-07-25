import React, { useState , useEffect} from 'react';
import './App.css';
import MainSidebar from './components/MainSidebar'
import { ModelDashBoard } from './components/ModelDashBoard';
import {BrowserRouter} from 'react-router-dom'
import Router from "./routes"

function App() {
  const [isOpen, setMenu] = useState(true);
  const [isDashboardOpen, setDashboard] = useState(true);

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);


  return (
  <div className="App relative"
  style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
    <BrowserRouter>
      <MainSidebar isOpen={isOpen} setMenu={setMenu} 
      isDashboardOpen={isDashboardOpen} setDashboard={setDashboard}/>
        <div className='relative w-full'>
          <div className={`${isOpen? 'ml-[16.25rem]': 'ml-[4.875rem]'} mr-80 pt-20 px-4 pb-4
      ease-in-out duration-500`}>
            <Router/>
          </div>
        </div>
      <ModelDashBoard isDashboardOpen={isDashboardOpen}/>
    </BrowserRouter>
    <div className='fixed bottom-0 left-0 w-full h-4 bg-blue-400 border-blue-200 z-40'/>
  </div>
  );
}

export default App;
