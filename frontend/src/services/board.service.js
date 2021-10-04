import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
import { utilService } from './util.service';
import {
  addList,
  copyList,
  updateList,
  moveList,
  moveAllCardsToList,
  sortList,
  archiveList,
  unarchiveList,
} from './board-services/list.service';
import {
  updateCard,
  addCard,
  moveCard,
  archiveCard,
  unarchiveCard,
  removeCard,
  copyCard,
} from './board-services/card.service';
import { httpService } from './http.service';
export const boardService = {
  add,
  query,
  update,
  // remove,
  getById,
  saveLabel,
  removeLabel,
  updateCard,
  addCard,
  moveCard,
  copyCard,
  archiveCard,
  unarchiveCard,
  removeCard,
  addList,
  copyList,
  updateList,
  moveList,
  moveAllCardsToList,
  createActivity,
  sortList,
  archiveList,
  unarchiveList,
};

window.bs = boardService;

function query() {
  // var queryStr = (!filterBy) ? '' : `?byUser=${filterBy.byUser}`
  return httpService.get(`board`);
  // return storageService.query('board', filterBy);
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`);
  // return storageService.get('board', boardId);
}

// function remove(boardId) {
//   // return httpService.delete(`board/${boardId}`)
//   return storageService.remove('board', boardId);
// }

async function add(board) {
  const addedBoard = await httpService.post(`board`, board);
  // board._id = utilService.makeId();
  // board.createdBy = userService.getLoggedinUser();
  // board.labels = [
  //   { id: utilService.makeId(), title: '', color: 'green' },
  //   { id: utilService.makeId(), title: '', color: 'yellow' },
  //   { id: utilService.makeId(), title: '', color: 'orange' },
  //   { id: utilService.makeId(), title: '', color: 'red' },
  //   { id: utilService.makeId(), title: '', color: 'purple' },
  //   { id: utilService.makeId(), title: '', color: 'blue' },
  // ];
  // // members
  // board.isFullLabels = false;
  // board.lists = [];
  // board.members.push(board.createdBy);
  // board.createdAt = Date.now();
  // board.archive = { lists: [], cards: [] }
  // const addedBoard = storageService.post('board', board);
  return addedBoard;
}

async function update(updatedBoard) {
  // Test reject:
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     const rand = Math.random();
  //     if (rand < 0.5) reject('hey');
  //     else {
  //       resolve(storageService.put('board', updatedBoard));
  //     }
  //   }, 1000);
  // });
  //
  // const board = await storageService.put('board', updatedBoard);
  const board = await httpService.put(`board/${updatedBoard._id}`, updatedBoard);
  return board;
}

function saveLabel(board, label) {
  if (label.id) {
    const idx = board.labels.findIndex(currLabel => currLabel.id === label.id);
    board.labels[idx] = label;
  } else {
    label.id = utilService.makeId();
    board.labels.push(label);
  }
  return board;
}

function removeLabel(board, labelId) {
  const idx = board.labels.findIndex(label => label.id === labelId); //removing from the board
  board.labels.splice(idx, 1);
  board.lists.forEach(list => {
    //removing from each card
    list.cards.forEach(card => {
      if (card.labelIds) {
        card.labelIds = card.labelIds.filter(id => id !== labelId);
      }
    });
  });
  board.archive.cards.forEach(archivedCard => {
    if (archivedCard.card.labelIds) {
      archivedCard.card.labelIds = archivedCard.card.labelIds.filter(id => id !== labelId);
    }
  });
  return board;
}

function createActivity(card, type, values) {
  const id = utilService.makeId();
  const createdBy = userService.getLoggedinUser();
  const createdAt = Date.now();
  const activity = { id, type, card, createdBy, createdAt, values };
  return activity;
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
      // socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshBoards[freshBoards.length - 1]);
    }
    boards = freshBoards;
  });
})();

// types: add, remove, update, attached, joined, left
