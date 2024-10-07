import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App(){
  
  const [page, setPage] = useState("land");
  const onLogin = () => {
    setPage("dash");
  }
  
  function renderPage(){
    switch(page){
      case "land" : return <LandingPage onLogin={onLogin} />;
      case "dash" : return <Dashboard />;
      default : return <div> Page not found</div>
    }
  }; 
  return (
    <>
      {renderPage()}
    </>
  )
}

export default App;