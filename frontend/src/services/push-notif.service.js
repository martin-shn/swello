export const pushNotifService = { subscribeUser };

function subscribeUser() {
  const publicVapidKey = 'BBGieDQKPJrzTX6bgj97u-MBRdO97yAtG990P3il5DidgCVcaOEfhO2Y4o9FSsx0vOyIL8oNtXH-yRpNv8U7YAg';
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
