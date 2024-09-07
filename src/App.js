import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import ChatBot from './components/ChatBot';
import CustomListings from './components/CustomListings';
import AnalyticsReport from './components/AnalyticsReport';
import Loading from './components/Loading';
import DetailPage from './components/DetailPage';
import ReturnToHome from './components/ReturnToHome'; 
import MemberInfoEdit from './pages/MemberInfoEdit'; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/report" element={<AnalyticsReport />} />
          <Route path="/listings" element={<CustomListings />} />
          <Route path="/listings/:id" element={<DetailPage />} />
          <Route path="/return-to-home" element={<ReturnToHome />} /> {/* ReturnToHome 경로 유지 */}
          <Route path="/edit-info" element={<MemberInfoEdit />} /> {/* MemberInfoEdit 경로 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
