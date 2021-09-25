import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
import { utilService } from './util.service';

export const boardService = {
  add,
  query,
  update,
  remove,
  getById,
  getCardById,
  saveCard,
  addList,
  updateList,
};

window.bs = boardService;

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?byUser=${filterBy.byUser}`
  // return httpService.get(`board${queryStr}`)
  return storageService.query('board', filterBy);
}

function getById(boardId) {
  return storageService.get('board', boardId);
}

function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return storageService.remove('board', boardId);
}

async function add(board) {
  // const addedBoard = await httpService.post(`board`, board)

  board._id = utilService.makeId();
  board.createdBy = userService.getLoggedinUser();
  board.labels = [];
  board.lists = [];
  board.members.push(board.createdBy);
  board.createdAt = Date.now();
  const addedBoard = storageService.post('board', board);
  return addedBoard;
}

async function update(updatedBoard) {
  const board = await storageService.put('board', updatedBoard);
  return board;
}

function getCardById(board, cardId) {
  for (const list of board.lists) {
    if (!list.cards) continue;
    for (const card of list.cards) {
      if (card.id === cardId) return card;
    }
  }
  return null;
}

function saveCard(board, updatedCard, activity) {
  board.lists.forEach(list => {
    if (!list.cards) return;
    list.cards.forEach((card, idx) => {
      if (card.id === updatedCard.id) list.cards[idx] = updatedCard;
    });
  });
  // board.activities.push(activity);
  return board;
}

function addList(board, listTitle) {
  const id = utilService.makeId();
  const list = { id, title: listTitle, cards: [], style: {} };
  board.lists.push(list);
  return board;
}

function updateList(board, updatedList) {
  board.lists.forEach((list, idx) => {
    if (list.id === updatedList.id) board.lists[idx] = updatedList;
  });
  return board;
}

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
  var boards = await storageService.query('board');

  // Dev Helper: Listens to when localStorage changes in OTHER browser
  window.addEventListener('storage', async () => {
    console.log('Storage updated');
    const freshBoards = await storageService.query('board');
    if (freshBoards.length === boards.length + 1) {
      console.log('Board Added - localStorage updated from another browser');
      socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshBoards[freshBoards.length - 1]);
    }
    boards = freshBoards;
  });
})();
