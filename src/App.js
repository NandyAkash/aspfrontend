import logo from './logo.svg';
import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Navigation} from './Components/Navigation'
import { Routes, Route } from "react-router-dom";
import { Employee } from './Components/Employee';
import { Department } from './Components/Department';
import { Home } from './Components/Home';
function App() {
  return (

      <div className="App">
        <Navigation />
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/employee' element={<Employee/>} />
          <Route path='/department' element={<Department/>} />
        </Routes>
      </div>
  );
}

export default App;
