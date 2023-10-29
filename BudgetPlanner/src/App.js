import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import AddExpense from './components/AddExpense';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import EditExpense from './components/EditExpense';
import DashboardPage from './components/dashboard';
import ProfilePage from './components/Profile';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/add" element={<AddExpense/>}/>
                <Route path="/edit" element={<EditExpense/>}/>
                <Route path="/dash" element={<DashboardPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                {/* <Route path="/test" element={<Back/>}/> */}
            </Routes>
        </Router>
    );
}

export default App;


