const authService = require('./auth.service');
const logger = require('../../services/logger.service');
const { update } = require('../user/user.service');

async function login(req, res) {
  const { username, password, subscription } = req.body;
  try {
    const user = await authService.login(username, password);
    update({ ...user, subscription });
    req.session.user = user;
    res.json(user);
  } catch (err) {
    logger.error('Failed to Login ' + err);
    res.status(401).send({ err: 'Failed to Login' });
  }
}

async function signup(req, res) {
  try {
    const { username, password, fullname, imgUrl } = req.body;
    // Never log passwords
    // logger.debug(fullname + ', ' + username + ', ' + password)
    const user = await authService.signup(username, password, fullname, imgUrl);
    logger.debug(`auth.route - new account created: ` + JSON.stringify(user));
    if (!user) res.status(500).send({ err: 'Username already exist' });
    req.session.user = user;
    res.json(user);
  } catch (err) {
    logger.error('Failed to signup ' + err);
    res.status(500).send({ err: 'An error occured. Please try again later' });
  }
}

async function logout(req, res) {
  try {
    // req.session.destroy()
    req.session.user = null;
    res.send({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' });
  }
}

module.exports = {
  login,
  signup,
  logout,
};
