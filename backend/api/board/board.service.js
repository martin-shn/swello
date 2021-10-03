const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(boardId = null) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId } = store
        const criteria = _buildCriteria(userId, boardId)
        const collection = await dbService.getCollection('board')
        const boards = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'createdBy',
                    from: 'user',
                    foreignField: '_id',
                    as: 'createdBy'
                }
            },
            {
                $unwind: '$createdBy'
            },
            {
                $lookup:
                {
                    localField: 'members',
                    from: 'user',
                    foreignField: '_id',
                    as: 'members'
                }
            },
            {
                $project: { 'createdBy.password': 0, 'createdBy.starredBoardsIds': 0, 'members.password': 0, 'members.starredBoardsIds': 0 }
            }
        ]).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`Cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId } = store
        const boardToAdd = {
            title: board.title,
            style: board.style,
            createdBy: ObjectId(userId),
            members: [ObjectId(userId)],
            createdAt: Date.now(),
            labels: [
                { id: _makeId(), title: '', color: 'green' },
                { id: _makeId(), title: '', color: 'yellow' },
                { id: _makeId(), title: '', color: 'orange' },
                { id: _makeId(), title: '', color: 'red' },
                { id: _makeId(), title: '', color: 'purple' },
                { id: _makeId(), title: '', color: 'blue' },
            ],
            isFullLabels: false,
            lists: [],
            archive: { lists: [], cards: [] },
            activities: []
        }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd;
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {
            ...board,
            createdBy: ObjectId(board.createdBy._id),
            members: board.members.map(member => ObjectId(member._id)),
            _id: ObjectId(board._id)
        };
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: boardToSave._id }, { $set: boardToSave })
        return board;
    } catch (err) {
        logger.error(`Cannot update board ${board._id}`, err)
        throw err
    }
}

function _buildCriteria(userId, boardId) {
    const criteria = {};
    criteria.members = { $in: [ObjectId(userId)] }
    if (boardId) criteria._id = { $eq: ObjectId(boardId) }
    return criteria
}


function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


module.exports = {
    query,
    remove,
    add,
    update
}


