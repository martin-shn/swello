const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query() {
  try {
    const store = asyncLocalStorage.getStore();
    const { userId } = store;
    const criteria = _buildCriteria(userId);
    const collection = await dbService.getCollection('board');
    const boards = await collection
      .aggregate([
        {
          $match: criteria,
        },
        {
          $lookup: {
            localField: 'createdBy',
            from: 'user',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $unwind: '$createdBy',
        },
        {
          $lookup: {
            localField: 'members',
            from: 'user',
            foreignField: '_id',
            as: 'members',
          },
        },
        {
          $project: {
            'createdBy.password': 0,
            'createdBy.starredBoardsIds': 0,
            'members.password': 0,
            'members.starredBoardsIds': 0,
          },
        },
      ])
      .toArray();
    return boards;
  } catch (err) {
    logger.error('cannot find boards', err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('board');
    const board = await collection
      .aggregate([
        {
          $match: { _id: ObjectId(boardId) },
        },
        {
          $lookup: {
            localField: 'createdBy',
            from: 'user',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $unwind: '$createdBy',
        },
        {
          $lookup: {
            localField: 'members',
            from: 'user',
            foreignField: '_id',
            as: 'members',
          },
        },
        {
          $project: {
            'createdBy.password': 0,
            'createdBy.starredBoardsIds': 0,
            'members.password': 0,
            'members.starredBoardsIds': 0,
          },
        },
      ])
      .toArray();
    return board[0];
  } catch (err) {
    logger.error(`Cannot get board by Id ${boardId}`, err);
    throw err;
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('board');
    await collection.deleteOne({ _id: ObjectId(boardId) });
    return boardId;
  } catch (err) {
    logger.error(`Cannot remove board ${boardId}`, err);
    throw err;
  }
}

async function add(board) {
  const defaultLabels = [
    { id: _makeId(), title: '', color: 'green' },
    { id: _makeId(), title: '', color: 'yellow' },
    { id: _makeId(), title: '', color: 'orange' },
    { id: _makeId(), title: '', color: 'red' },
    { id: _makeId(), title: '', color: 'purple' },
    { id: _makeId(), title: '', color: 'blue' },
  ];
  try {
    const { title, style, lists = [], labels = defaultLabels } = board;
    // when creating through template - there might be lists and labels,
    // normal creation - lists are empty array and labels are default labels.
    const store = asyncLocalStorage.getStore();
    const { userId } = store;
    const boardToAdd = {
      title,
      style,
      createdBy: ObjectId(userId),
      members: [ObjectId(userId)],
      createdAt: Date.now(),
      labels,
      isFullLabels: false,
      lists,
      archive: { lists: [], cards: [] },
      activities: [],
    };
    const collection = await dbService.getCollection('board');
    await collection.insertOne(boardToAdd);
    return boardToAdd;
  } catch (err) {
    logger.error('cannot insert board', err);
    throw err;
  }
}

async function update(board) {
  try {
    const boardToSave = {
      ...board,
      createdBy: ObjectId(board.createdBy._id),
      members: board.members.map(member => ObjectId(member._id)),
      _id: ObjectId(board._id),
    };
    const collection = await dbService.getCollection('board');
    await collection.updateOne({ _id: boardToSave._id }, { $set: boardToSave });
    return board;
  } catch (err) {
    logger.error(`Cannot update board ${board._id}`, err);
    throw err;
  }
}

function _buildCriteria(userId) {
  const criteria = {};
  if (userId) criteria.members = { $in: [ObjectId(userId)] };
  return criteria;
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
  update,
  getById,
};
