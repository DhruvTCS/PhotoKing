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
import { onMessageListener, requestFirebaseNotificationPermission } from './firebase'
import { setFCM } from './Redux/Slice/Dashboard/ExtraSlice';
import EditMemberPage from './components/molecules/Dashboard/Member/EditNewMember';
import EventCalendar from './components/organisms/Dashboard/EventCalendar';
function App() {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //     .then(registration => {
  //       // console.log('Service Worker registered with scope:', registration.scope);
  //     })
  //     .catch(err => {
  //       // console.log('Service Worker registration failed:', err);
  //     });

  //   navigator.serviceWorker.addEventListener('message', (event) => {
  //     // console.log("Data payload from background notification ");
  //     // console.log(event.data.payload);
  //     if (event.data && event.data.type === 'BACKGROUND_NOTIFICATION') {
  //       // store.dispatch(addNotification(event.data.payload));

  //     }
  //   });
  // }

  const navigate = useNavigate();
  useEffect(() => {
    // setupNotifications()

    if (!localStorage.getItem('access_token')) {

      navigate('/auth/login');
    } else {
      navigate('/dashboard/')
    }


  }, [])
  // useEffect(() => {
  //   requestFirebaseNotificationPermission();

  //   onMessageListener()
  //     .then(payload => {
  //       console.log('Message received: ', payload);
  //     })
  //     .catch(err => console.log('Failed to receive message: ', err));
  // }, []);



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
            <Route path="members/create/new" element={<CreateNewMemberPage />} />
            <Route path="members/edit/:id" element={<EditMemberPage />} />
            <Route path="albums/all" element={<Albums />} />
            <Route path="albums/folder/:id" element={<UpdateFolderPage />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
            <Route path="albums/share/:code" element={<ShareCodePage />} />
            <Route path="event" element={<EventCalendar />} />

          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
