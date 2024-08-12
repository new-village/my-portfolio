import React from 'react';
import './App.css';
import SideBar from './components/SideBar';
import HomePage from './components/HomePage';
import CorporateList from './components/CorporateList';
import CorporateDetail from './components/CorporateDetail';
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
            <Route path="/corporate" element={<CorporateList />} />
            <Route path="/corporate/:corporateNumber" element={<CorporateDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
