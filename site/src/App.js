import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login.js';
import MyPage from './pages/MyPage';
import ChatBot from './components/ChatBot';
import CustomListings from './components/CustomListings';
import AnalyticsReport from './components/AnalyticsReport'

import './App.css';

function App() {
  return (
    <div className="App">

      <Login></Login>



    </div>
  );
}

export default App;
