importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js");

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;


firebase.initializeApp({
    apiKey: "AIzaSyCkMeKxdvO4dF5v6S-3LDJ2tmXBLcKN_Ik",
    authDomain: "dn-lms.firebaseapp.com",
    projectId: "dn-lms",
    storageBucket: "dn-lms.appspot.com",
    messagingSenderId: "424412753360",
    appId: "1:424412753360:web:71823ca28057d08e805dd5",
    measurementId: "G-8PQ4FH8W8V"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});