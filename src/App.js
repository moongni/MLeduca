import React, { useState , useEffect} from 'react';
import MainSidebar from './components/MainSidebar'
import "./App.css"
import { ModelDashBoard } from './components/ModelDashBoard';
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes"

function App() {
  const [isOpen, setMenu] = useState(false);
  const [isDashboardOpen, setDashboard] = useState(false);

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);

  return (
    <BrowserRouter>
      <div className="App relative top-0 left-0 bg-slate-100"
           style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
          <MainSidebar 
            isOpen={isOpen} 
            setMenu={setMenu} 
            isDashboardOpen={isDashboardOpen} 
            setDashboard={setDashboard}
          />
          <div className={`${isOpen? 'ml-[16.25rem]': 'ml-[4.875rem]'} ${isDashboardOpen? 'mr-[16.25rem]' : '' } 
                              relative left-0 top-0 pt-20 px-4 pb-4 ease-in-out duration-300`}
          >
              <Router/>
          </div>
          <ModelDashBoard 
            isDashboardOpen={isDashboardOpen}
          />
        <div className='fixed bottom-0 left-0 w-full h-4 bg-blue-400 border-blue-200 z-40'/>
      </div>
    </BrowserRouter>
  );
}

export default App;
