// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAJUQhRC6vk0U9OT0h98CiAAMBeClaU0sw",
    authDomain: "photo-app-44a28.firebaseapp.com",
    projectId: "photo-app-44a28",
    storageBucket: "photo-app-44a28.appspot.com",
    messagingSenderId: "652436510048",
    appId: "1:652436510048:web:65a9933b11414e7dbc3a05",
    measurementId: "G-C6C03DX2DG"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title || 'Default Title';
    const notificationOptions = {
        body: payload.notification.body || 'Default body.',
        icon: '/firebase-logo.png'
    };

    // Send message to main thread to update Redux store
    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(windowClients => {
        for (let client of windowClients) {
            client.postMessage({
                type: 'BACKGROUND_NOTIFICATION',
                payload: payload
            });
        }
    });

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    console.log('[firebase-messaging-sw.js] Notification click Received.');
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
            for (let client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
