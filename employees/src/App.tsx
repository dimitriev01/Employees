import React from "react";
import { BrowserRouter } from 'react-router-dom'
import { Router } from "./components/Router/Router";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
