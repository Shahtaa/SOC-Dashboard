import React from 'react';
import PalomuuriComponent from './components/PalomuuriComponent';
import ServerLogComponent from './components/ServerLogComponent';
import ReititinComponent from './components/ReititinComponent';
import TyoasemaComponent from './components/TyoasemaComponent';
import './App.css'; // Import CSS file for styling

const App = () => {
  return (

    <div className="container">
      <h1>My SOC Dashboard</h1>
      <div className="grid-container">
        <div className="grid-item">
          <PalomuuriComponent />
        </div>
        <div className="grid-item">
          <ServerLogComponent />
        </div>
        <div className="grid-item">
          <ReititinComponent />
        </div>
        <div className="grid-item">
          <TyoasemaComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
