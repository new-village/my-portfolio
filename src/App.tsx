import React from 'react';
import './App.css';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
import CorporatePage from './components/CorporatePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router basename="/my-portfolio">
      <div className="App">
        <SideBar />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/corporate" element={<CorporatePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
