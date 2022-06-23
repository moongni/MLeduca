import React from 'react';
import './App.css';
import MainSidebar from './components/MainSidebar'
import { ModelDashBoard } from './components/ModelDashBoard';
import Home from './pages/Home';

function App() {

  return (
  <div className="App w-full">
    <MainSidebar />
      <div className='relative flex pl-72 top-16 mt-2 bg-slate-100'>
        <Home />
      </div>
    <ModelDashBoard />
  </div>
  );
}

export default App;
