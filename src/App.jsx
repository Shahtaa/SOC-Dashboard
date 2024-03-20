// App.jsx
import React from 'react';
import PalomuuriComponent from './PalomuuriComponent';
import ServerLogComponent from './ServerLogComponent';
import ReititinComponent from './ReititinComponent';
import TyoasemaComponent from './TyoasemaComponent';

const App = () => {
  return (
    <div>
      <h1>My SOC Dashboard</h1>
      <div>
        <PalomuuriComponent />
      </div>
      <div>
        <ServerLogComponent />
      </div>
      <div>
        <ReititinComponent />
      </div>
      <div>
        <TyoasemaComponent />
      </div>
    </div>
  );
};

export default App;
