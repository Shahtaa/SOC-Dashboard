// App.jsx
import React from 'react';
import PalomuuriComponent from './components/PalomuuriComponent';

import ServerLogComponent from './components/ServerLogComponent';
import ReititinComponent from './components/ReititinComponent';
import TyoasemaComponent from './components/TyoasemaComponent';

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
