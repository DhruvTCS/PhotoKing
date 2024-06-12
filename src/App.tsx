import React from 'react';
import './App.css';

import Auth from './components/pages/Auth/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import LoginForm from './components/organisms/Auth/Login/LoginForm';
import OtplVerificationForm from './components/organisms/Auth/OtpVerification/OtpVerificationForm';
function App() {
  return (
    <Provider store={store}>

      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route path="otp" element={<OtplVerificationForm />} />
              <Route path="login" element={<LoginForm />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
