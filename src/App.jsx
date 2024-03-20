// App.jsx
import React from 'react';
import PalomuuriComponent from './PalomuuriComponent';
import ServerLogComponent from './ServerLogComponent';

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
    </div>
  );
};

export default App;
