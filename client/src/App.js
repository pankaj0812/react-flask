import React from 'react';
import List from './components/List';
function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center">Admin Dashboard</h1>
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
