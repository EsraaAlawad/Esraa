import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>Welcome to the Registration App</h1>
      <Link to="/regist">
        <span>Go to Registration Page</span>
      </Link>
    </div>
  );
};

export default App;
