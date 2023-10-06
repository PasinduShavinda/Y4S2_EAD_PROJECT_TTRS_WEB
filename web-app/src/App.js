import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./components/HomePage/Homepage";
function App() {
  return (
    <div className="App">
        <React.Fragment>
    
        <Routes>
        <Route path="/" element={< Homepage />} exact />
        </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
