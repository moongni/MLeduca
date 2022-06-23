import React, { useState } from 'react';
import './App.css';
import MainSidebar from './components/MainSidebar'
import { ModelDashBoard } from './components/ModelDashBoard';
import Home from './pages/Home';

function App() {
  const [isOpen, setMenu] = useState(true);

  return (
  <div className="App w-full">
    <MainSidebar isOpen={isOpen} setMenu={setMenu} />
      <div className={`relative flex ${isOpen? 'ml-72': 'ml-24'} mr-80 mt-2 p-8 top-16 rounded-xl
      bg-red-500 ease-in-out duration-500`}>
        <Home />
      </div>
    <ModelDashBoard />
  </div>
  );
}

export default App;
