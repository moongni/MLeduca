import React, { useState , useEffect} from 'react';
import './App.css';
import MainSidebar from './components/MainSidebar'
import { ModelDashBoard } from './components/ModelDashBoard';
import Home from './pages/Home';
import Gradients from './pages/Gradients';
import Optimizers from "./pages/Optimizers"
import Losses from './pages/Losses';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [isOpen, setMenu] = useState(true);

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);

  return (
  <div className="App">
    <BrowserRouter>

      <MainSidebar isOpen={isOpen} setMenu={setMenu}/>
        <div className='relative w-full'
        style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
          <div className={`${isOpen? 'ml-72': 'ml-24'} mr-80 pt-20 px-8 pb-4
          ease-in-out duration-500`}>

          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Gradients/' element={<Gradients/>}/>
            <Route path='/Optimizers/' element={<Optimizers/>}/>
            <Route path='/Losses/' element={<Losses/>}/>
          </Routes> 

          </div>
          <footer className='absolute bottom-0 left-0 w-full h-4 bg-blue-400 border-blue-200 z-40'/>
        </div>
      <ModelDashBoard />
    </BrowserRouter>
  </div>
  );
}

export default App;
