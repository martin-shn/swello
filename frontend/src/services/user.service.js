// import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { pushNotifService } from './push-notif.service';
import { socketService } from './socket.service';
// const {SOCKET_EVENT_SET_USER, SOCKET_EVENT_UNSET_USER} = socketService

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

const SOCKET_EVENT_SET_USER = 'set-user-socket';
const SOCKET_EVENT_UNSET_USER = 'unset-user-socket';

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  update,
};

window.userService = userService;

function getUsers(filterBy) {
  // return storageService.query('user', filterBy);
  return httpService.get(`user?name=${filterBy.name}`);
}

async function getById(userId) {
  // const user = await storageService.get('user', userId);
  const user = await httpService.get(`user/${userId}`);
  return user;
}

async function update(user, isCurrUser = true) {
  // await storageService.put('user', user);
  user = await httpService.put(`user/${user._id}`, user);
  return isCurrUser ? _saveLocalUser(user) : user;
}

async function login(userCred) {
  // const users = await storageService.query('user');
  // const user = users.find(user => user.username === userCred.username);
  // if (user) return _saveLocalUser(user);
  // throw new Error('Auth error');

  // with service worker - use in production:
  // const subscription = await pushNotifService.subscribeUser();
  // const user = await httpService.post('auth/login', { ...userCred, subscription });
  // no service worker - use in developement:
  const user = await httpService.post('auth/login', userCred);

  socketService.emit(SOCKET_EVENT_SET_USER, user._id);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  // const user = await storageService.post('user', userCred);
  const user = await httpService.post('auth/signup', userCred);
  socketService.emit(SOCKET_EVENT_SET_USER, user._id);
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  socketService.emit(SOCKET_EVENT_UNSET_USER);
  return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null');
}

// (async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })();

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     var user = getLoggedinUser()
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         if (gWatchedUser.score !== watchedUser.score) {
//             console.log('Watched user score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//         }
//         gWatchedUser = watchedUser
//     })
// })();

// This is relevant when backend is connected
(async () => {
  var user = getLoggedinUser();
  if (user) socketService.emit(SOCKET_EVENT_SET_USER, user._id);
})();
