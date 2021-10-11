export const pushNotifService = { subscribeUser };

function subscribeUser() {
  const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
  if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
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
