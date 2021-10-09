export const pushNotifService = { subscribeUser };

function subscribeUser() {
  const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
<<<<<<< HEAD
=======
  console.log('publicVapidKey', publicVapidKey);
>>>>>>> 8651b6ad32c9f9a56489c963b6d8ebc662b6ffd6
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicVapidKey,
        })
        .then(function (sub) {
          return sub;
        })
        .catch(function (e) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Unable to subscribe to push', e);
          }
        });
    });
  }
}
