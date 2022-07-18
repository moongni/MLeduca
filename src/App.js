import React, { useState , useEffect} from 'react';
import './App.css';
import MainSidebar from './components/MainSidebar'
import { ModelDashBoard } from './components/ModelDashBoard';
import Home from './pages/Home';

function App() {
  const [isOpen, setMenu] = useState(true);

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);

  return (
  <div className="App">
    <MainSidebar isOpen={isOpen} setMenu={setMenu}/>
    <div className='relative w-full'
    style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
      <div className={`${isOpen? 'ml-72': 'ml-24'} mr-80 pt-20 px-8 pb-4
      bg-red-500 ease-in-out duration-500`}>
        <Home />
      </div>
      <footer className='absolute bottom-0 left-0 w-full h-4 bg-blue-600 z-40'/>
    </div>
    <ModelDashBoard />
  </div>
  );
}

export default App;
