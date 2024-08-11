import React from 'react';
import './App.css';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
import CnpsList from './components/CnpsList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router basename="/my-portfolio">
      <div className="App">
        <SideBar />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cnps" element={<CnpsList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
