import React, { useEffect } from 'react';
import "./App.css"
import Router from "./routes"

function App() {

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [window.innerHeight]);

  return (
      <div className="App relative bg-slate-100"
        style={{"minHeight":"calc(var(--vh, 1vh) * 100)"}}>
        <Router/>
        <div className='fixed bottom-0 left-0 w-full h-4 bg-blue-400 border-blue-200 z-40'/>
      </div>
  );
}

export default App;
