const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser } = require('./user.controller')
const router = express.Router()

router.get('/', requireAuth, getUsers)
router.get('/:id', requireAuth, getUser)
router.put('/:id', requireAuth,  updateUser)

module.exports = router