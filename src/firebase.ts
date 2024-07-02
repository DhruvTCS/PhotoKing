// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import store from './Redux/Store';
import { setFCM } from './Redux/Slice/Dashboard/ExtraSlice';
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

export const requestFirebaseNotificationPermission = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: 'BK8Ta1Q7NMigMZ0WVTOIMSvETPh0huzDeEEmKD5X63xZ9HI6GxbqNTJF3SQ_1IPG1LxRrPFK-aF9_EjJHtBqwqA'
        });
        if (token) {
            console.log('FCM Token:', token);
            store.dispatch(setFCM(token));
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    } catch (error) {
        console.error('An error occurred while retrieving the token. ', error);
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('Foreground message received:', payload);
            // store.dispatch(addNotification(payload)); // Update Redux store
            resolve(payload);
        });
    });