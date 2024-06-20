import React, { useEffect, } from 'react';
import './App.css';

import Auth from './components/pages/Auth/Auth';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import LoginForm from './components/organisms/Auth/Login/LoginForm';
import OtplVerificationForm from './components/organisms/Auth/OtpVerification/OtpVerificationForm';
import RegisterForm from './components/organisms/Auth/Register/RegisterForm';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { setMember } from './Redux/Slice/Dashboard/MemberSlice';
import HomePage from './components/organisms/Dashboard/HomePage';
import SingleAlbum from './components/organisms/Dashboard/SingleAlbumPage';
import AllMembersPage from './components/organisms/Dashboard/AllMembersPage';
import CreateNewMemberPage from './components/molecules/Dashboard/Member/CreateNewMember';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {

      navigate('/auth/signup');
    }

  }, [])
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="otp" element={<OtplVerificationForm />} />
            <Route path="signup" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route path="singleAlbum/:new" element={< SingleAlbum />} />
            <Route path="members/all" element={<AllMembersPage />} />
            <Route path="members/create" element={<CreateNewMemberPage />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
