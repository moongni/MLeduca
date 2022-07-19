import React, { useState , useEffect, useMemo} from 'react';
import './App.css';
import Box from './components/Box';
import MainSidebar from './components/MainSidebar'
import { ModelDashBoard } from './components/ModelDashBoard';
// import Home from './pages/Home';
import Table from './components/Table';

function App() {
  const [isOpen, setMenu] = useState(true);

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);

    const header = "헤더입니다";
    const contents = "내요오오오오오요요용";

  return (
  <div className="App">
    <MainSidebar isOpen={isOpen} setMenu={setMenu}/>
    <div className='relative w-full'
    style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
      <div className={`${isOpen? 'ml-72': 'ml-24'} mr-80 pt-20 px-8 pb-4
       ease-in-out duration-500`}>
        <Box header={header} contents={contents}></Box>
      </div>
      <footer className='absolute bottom-0 left-0 w-full h-4 bg-blue-400 border-blue-200 z-40'/>
    </div>
    <ModelDashBoard />
  </div>
  );
}

export default App;
