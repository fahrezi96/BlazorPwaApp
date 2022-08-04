
function push() {
    document.getElementById('notif').classList.remove('hide');

    console.log(document.getElementById('notif'))

    MsgElem = document.getElementById('msg');
    TokenElem = document.getElementById('token');
    NotisElem = document.getElementById('notis');
    ErrElem = document.getElementById('err');

    var firebaseConfig = {
        apiKey: 'AIzaSyDiu1K7rWwfdBNk04LUEIjU8I4TgIxB7sw',
        authDomain: 'pushnotif-3b63f.firebaseapp.com',
        projectId: 'pushnotif-3b63f',
        storageBucket: 'pushnotif-3b63f.appspot.com',
        messagingSenderId: '953637609495',
        appId: '1:953637609495:web:163ba56cd1a9667312bc52',
        measurementId: 'G-0ZXF9FYQ7Q',
    };
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(function () {
            MsgElem.innerHTML = 'Notification permission granted.';
            console.log('Notification permission granted.');


            return messaging.getToken();
        })
        .then(function (token) {
            TokenElem.innerHTML = 'Device token is : <br>' + token;
        })
        .catch(function (err) {
            ErrElem.innerHTML = ErrElem.innerHTML + '; ' + err;
            console.log('Unable to get permission to notify.', err);
        });

    let enableForegroundNotification = true;
    messaging.onMessage(function (payload) {
        console.log('Message received. ', payload);
        NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload);

        if (enableForegroundNotification) {
            let notification = payload.notification;
            navigator.serviceWorker.getRegistrations().then((registration) => {
                registration[0].showNotification(notification.title);
            });
        }
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('firebase-messaging-sw.js')
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
            })
            .catch(function (err) {
                console.log('Service worker registration failed, error:', err);
            });
    }
}

document.getElementById('loadNotif').addEventListener('click', push);