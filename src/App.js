import React, { useState , useEffect} from 'react';
import "./App.css"
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes"
import MainLayout from './pages/MainLayout';

function App() {

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);

  return (
    <BrowserRouter>
      <div className="App relative bg-slate-100"
           style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
        <MainLayout/>
          <Router/>
        {/* <div className={`relative ${isOpen? 'ml-[16.25rem]': 'ml-[4.875rem]'} ${isDashboardOpen? 'mr-[16.25rem]' : '' } pt-20 px-4 pb-4 ease-in-out duration-300`}>
        </div> */}
        <div className='fixed bottom-0 left-0 w-full h-4 bg-blue-400 border-blue-200 z-40'/>
      </div>
    </BrowserRouter>
  );
}

export default App;
