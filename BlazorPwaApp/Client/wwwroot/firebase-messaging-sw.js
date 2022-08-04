importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: '953637609495',
  apiKey: 'AIzaSyDiu1K7rWwfdBNk04LUEIjU8I4TgIxB7sw',
  projectId: 'pushnotif-3b63f',
  appId: '1:953637609495:web:163ba56cd1a9667312bc52',
  authDomain: 'pushnotif-3b63f.firebaseapp.com',
  storageBucket: 'pushnotif-3b63f.appspot.com',
  measurementId: 'G-0ZXF9FYQ7Q',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: './itwonders-web-logo.png',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
