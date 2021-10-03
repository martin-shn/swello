const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getById(req, res) {
    try {
        const boardId = req.params.id;
        const result = await boardService.query(boardId)
        const board = result[0];
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board')
        res.status(500).send({ err: 'Failed to get board' })
    }
}
async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}


async function addBoard(req, res) {
    try {
        let board = req.body
        board = await boardService.add(board)

        // prepare the updated review for sending out
        // review.aboutUser = await userService.getById(review.aboutUserId)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'review-added', data: review, userId: review.byUserId})
        // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(board)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body;
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board')
        res.status(500).send({ err: 'Failed to update board' })
    }
}

module.exports = {
    getBoards,
    deleteBoard,
    addBoard,
    updateBoard,
    getById
}