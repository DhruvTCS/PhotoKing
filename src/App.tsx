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
import HomePage from './components/organisms/Dashboard/HomePage';
import SingleAlbum from './components/organisms/Dashboard/SingleAlbumPage';
import AllMembersPage from './components/organisms/Dashboard/AllMembersPage';
import CreateNewMemberPage from './components/molecules/Dashboard/Member/CreateNewMember';
import Albums from './components/molecules/Dashboard/HomePage/Albums';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SubscriptionPage from './components/organisms/Dashboard/SubscriptionPage';
import ShareCodePage from './components/organisms/Dashboard/ShareCodePage';
import UpdateFolderPage from './components/molecules/Dashboard/SingleAlbumPage/UpdateFolderPage';
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {

      navigate('/auth/login');
    } else {
      navigate('/dashboard/')
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
            <Route path="albums/all" element={<Albums />} />
            <Route path="albums/folder/:id" element={<UpdateFolderPage />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
            <Route path="albums/share/:code" element={<ShareCodePage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
