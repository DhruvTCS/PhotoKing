// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import store from './Redux/Store'
// import { addNotification } from './Redux/Slice/NotificationSlice'; // hypothetical slice to handle notifications

const firebaseConfig = {
    apiKey: "AIzaSyAJUQhRC6vk0U9OT0h98CiAAMBeClaU0sw",
    authDomain: "photo-app-44a28.firebaseapp.com",
    projectId: "photo-app-44a28",
    storageBucket: "photo-app-44a28.appspot.com",
    messagingSenderId: "652436510048",
    appId: "1:652436510048:web:65a9933b11414e7dbc3a05",
    measurementId: "G-C6C03DX2DG"
};


const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
