import { httpService } from './http.service';
import { pushNotifService } from './push-notif.service';
import { socketService } from './socket.service';

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
  return httpService.get(`user?name=${filterBy.name}`);
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  return user;
}

async function update(user, isCurrUser = true) {
  user = await httpService.put(`user/${user._id}`, user);
  return isCurrUser ? _saveLocalUser(user) : user;
}

async function login(userCred) {
  // with service worker - use in production:
  const subscription = await pushNotifService.subscribeUser();
  const user = await httpService.post('auth/login', { ...userCred, subscription });
  // no service worker - use in developement:
  // const user = await httpService.post('auth/login', userCred);
  socketService.emit(SOCKET_EVENT_SET_USER, user._id);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
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

(async () => {
  var user = getLoggedinUser();
  if (user) socketService.emit(SOCKET_EVENT_SET_USER, user._id);
})();
