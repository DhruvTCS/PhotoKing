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
import { setFCM, updateNotification } from './Redux/Slice/Dashboard/ExtraSlice';
import EditMemberPage from './components/molecules/Dashboard/Member/EditNewMember';
import EventCalendar from './components/organisms/Dashboard/EventCalendar';
import { app, messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import ChangePhoneNumber from './components/organisms/Dashboard/ChangePhoneNumber';
import AllNotificationPage from './components/organisms/Dashboard/AllNotificationPage';
import RedeemUser from './components/atoms/Dashboard/HomePage/RedeemUser';
import AllPackagesPage from './components/organisms/Dashboard/AllPackagesPage';
import AddNewPackagePage from './components/molecules/Dashboard/Package/AddNewPackagePage';
function App() {

  const navigate = useNavigate();
  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") {
  //     // Generate Token
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BLlRcimfpiB0wFXdmp2OGVHx5hGyMOjgke1yNtpokahKnMRmpbR-u5brlcoEUyGlHbrci-AdBqSku1GosO6X6yg",
  //     });
  //     // console.log("Token Gen", token);
  //     store.dispatch(setFCM(token));
  //     // Send this token  to server ( db)
  //   } else if (permission === "denied") {
  //     alert("You denied for the notification");
  //   }
  // }
  // onMessage(messaging, (payload) => {
  //   console.log(payload);
  //   store.dispatch(updateNotification({ update: true, count: 1 }));
  //   // toast(<Message notification={payload.notification} />);
  // });
  // useEffect(() => {
  //   // Req user for notification permission

  //   async function requestPermission() {
  //     const permission = await Notification.requestPermission();
  //     if (permission === "granted") {
  //       // Generate Token
  //       const token = await getToken(messaging, {
  //         vapidKey:
  //           "BLlRcimfpiB0wFXdmp2OGVHx5hGyMOjgke1yNtpokahKnMRmpbR-u5brlcoEUyGlHbrci-AdBqSku1GosO6X6yg",
  //       });
  //       // console.log("Token Gen", token);
  //       store.dispatch(setFCM(token));
  //       // Send this token  to server ( db)
  //     } else if (permission === "denied") {
  //       alert("You denied for the notification");
  //     }
  //   }
  //   // 
  //   requestPermission();
  // }, []);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((err) => {
            console.error('Service Worker registration failed:', err);
          });

        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log('Message received from service worker:', event);
          if (event.data && event.data.msg === 'backgroundMessage') {
            const payload = event.data.data;
            store.dispatch(updateNotification({ update: true, count: 1 }));
            console.log('Background message received in React app:', payload);

            // Handle the payload as needed in your React app
          }
        });
      }
    }

  }, []);


  useEffect(() => {
    // alert("called")

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
            <Route path="members/create/new" element={<CreateNewMemberPage />} />
            <Route path="members/edit/:id" element={<EditMemberPage />} />
            <Route path="albums/all" element={<Albums />} />
            <Route path="albums/folder/:id" element={<UpdateFolderPage />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
            <Route path="albums/share/:code" element={<ShareCodePage />} />
            <Route path="albums/redeemUsers/:id" element={<RedeemUser />} />
            <Route path="event" element={<EventCalendar />} />
            <Route path="user/changePhoneNumber" element={<ChangePhoneNumber />} />
            <Route path="user/allNotifications" element={<AllNotificationPage />} />
            <Route path="package/single" element={<AddNewPackagePage />} />
            <Route path="packages/all" element={<AllPackagesPage />} />

          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
