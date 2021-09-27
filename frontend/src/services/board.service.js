import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
import { utilService } from './util.service';
import { addList, copyList, updateList, moveList } from './board-services/list.service';
import { updateCard, addCard } from './board-services/card.service';
export const boardService = {
  add,
  query,
  update,
  remove,
  getById,
  saveLabel,
  removeLabel,
  updateCard,
  addCard,
  addList,
  copyList,
  updateList,
  moveList,
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
  board.labels = [
    { id: utilService.makeId(), title: '', color: 'green' },
    { id: utilService.makeId(), title: '', color: 'yellow' },
    { id: utilService.makeId(), title: '', color: 'orange' },
    { id: utilService.makeId(), title: '', color: 'red' },
    { id: utilService.makeId(), title: '', color: 'purple' },
    { id: utilService.makeId(), title: '', color: 'blue' },
  ];
  board.isFullLabels = false;
  board.lists = [];
  board.members.push(board.createdBy);
  board.createdAt = Date.now();
  const addedBoard = storageService.post('board', board);
  return addedBoard;
}

async function update(updatedBoard) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('hey')
    }, 1000)
  })
  // const board = await storageService.put('board', updatedBoard);
  // return board;
}

function saveLabel(board, label) {
  if (label.id) {
    const idx = board.labels.findIndex(currLabel => currLabel.id === label.id)
    board.labels[idx] = label;
  } else {
    label.id = utilService.makeId();
    board.labels.push(label)
  }
  return board;
}

function removeLabel(board, labelId) {
  const idx = board.labels.findIndex(label => label.id === labelId) //removing from the board
  board.labels.splice(idx, 1)
  board.lists.forEach(list => { //removing from each card
    list.cards.forEach(card => {
      if (card.labelIds) {
        card.labelIds = card.labelIds.filter(id => id !== labelId)
      }
    })
  })
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
