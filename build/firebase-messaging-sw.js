// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
firebase.initializeApp({
    apiKey: "AIzaSyAJUQhRC6vk0U9OT0h98CiAAMBeClaU0sw",
    authDomain: "photo-app-44a28.firebaseapp.com",
    projectId: "photo-app-44a28",
    storageBucket: "photo-app-44a28.appspot.com",
    messagingSenderId: "652436510048",
    appId: "1:652436510048:web:65a9933b11414e7dbc3a05",
    measurementId: "G-C6C03DX2DG"
});
//
const messaging = firebase.messaging();
messaging.onBackgroundMessage(async (payload) => {
    // console.log('[firebase-messaging-sw.js] Received background message', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png' // Customize as per your requirement
    };
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    self.registration.showNotification(notificationTitle, notificationOptions);
    // console.log('[firebase-messaging-sw.js] Clients:', clients);

    if (clients && clients.length > 0) {

        clients.forEach(client => {
            client.postMessage({
                msg: 'backgroundMessage',
                data: payload
            });
        });

    } else {
        // console.log('[firebase-messaging-sw.js] No clients available, showing notification');
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: '/firebase-logo.png' // Customize as per your requirement
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});