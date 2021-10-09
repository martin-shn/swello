const userService = require('./user.service');
const socketService = require('../../services/socket.service');
const logger = require('../../services/logger.service');
const asyncLocalStorage = require('../../services/als.service');
const webpush = require('web-push');

async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params.id);
    res.send(user);
  } catch (err) {
    logger.error('Failed to get user', err);
    res.status(500).send({ err: 'Failed to get user' });
  }
}

async function getUsers(req, res) {
  try {
    const filterBy = {
      name: req.query?.name || '',
    };
    const users = await userService.query(filterBy);
    res.send(users);
  } catch (err) {
    logger.error('Failed to get users', err);
    res.status(500).send({ err: 'Failed to get users' });
  }
}

// async function deleteUser(req, res) {
//     try {
//         await userService.remove(req.params.id)
//         res.send({ msg: 'Deleted successfully' })
//     } catch (err) {
//         logger.error('Failed to delete user', err)
//         res.status(500).send({ err: 'Failed to delete user' })
//     }
// }

async function updateUser(req, res) {
  try {
    const user = req.body;
    const savedUser = await userService.update(user);
    const alsStore = asyncLocalStorage.getStore();
    const userId = alsStore.userId;
    if (userId !== savedUser._id.toString()) {
      webpush
        .sendNotification(
          savedUser.subscription,
          JSON.stringify({
            title: 'Swello - New Activity',
            text: savedUser.notifications[0].txt,
            url: savedUser.notifications[0].url,
            image: 'https://logos-world.net/wp-content/uploads/2021/02/Trello-Emblem.png',
          })
        )
        .catch(err => logger.error('err in sendNotification:', err));
      socketService.emitToUser({
        type: socketService.SOCKET_EVENT_USER_UPDATED,
        data: savedUser,
        userId: savedUser._id,
      });
    }
    res.send(savedUser);
  } catch (err) {
    logger.error('Failed to update user', err);
    res.status(500).send({ err: 'Failed to update user' });
  }
}

module.exports = {
  getUser,
  getUsers,
  // deleteUser,
  updateUser,
};
