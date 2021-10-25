import io from 'socket.io-client';

export const SOCKET_EVENT_BOARD_UPDATED = 'board-updated';
export const SOCKET_EVENT_SET_BOARD = 'set-board';
export const SOCKET_EVENT_SET_USER = 'set-user-socket';
export const SOCKET_EVENT_UNSET_USER = 'unset-user-socket';
export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
export const SOCKET_EVENT_ITEM_DRAGGED = 'item-dragged'
export const SOCKET_EVENT_UNSET_ITEM_DRAGGED = 'unset-item-dragged'


const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030';
export const socketService = createSocketService();

window.socketService = socketService;

socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      socket = io(baseUrl);
    },
    on(eventName, cb) {
      socket.on(eventName, cb);
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },
    emit(eventName, data) {
      socket.emit(eventName, data);
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}