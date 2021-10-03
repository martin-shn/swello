const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addBoard, getBoards, deleteBoard, updateBoard, getById } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, requireAuth, getBoards)
router.post('/', log, requireAuth, addBoard)
router.put('/:id', log, requireAuth, updateBoard)
router.delete('/:id', requireAuth, deleteBoard)
router.get('/:id', requireAuth, getById)

module.exports = router