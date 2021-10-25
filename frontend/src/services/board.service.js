import { userService } from './user.service';
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
  templatesQuery,
  update,
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
  return httpService.get(`board`);
}

function templatesQuery() {
  return httpService.get('template');
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`);
}

async function add(board) {
  const addedBoard = await httpService.post(`board`, board);
  return addedBoard;
}

async function update(updatedBoard) {
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
  const activity = {
    id,
    type,
    card: { id: card.id, title: card.title },
    createdBy: {
      _id: createdBy._id,
      fullname: createdBy.fullname,
      username: createdBy.username,
      imgUrl: createdBy.imgUrl,
    },
    createdAt,
    values,
  };
  return activity;
}
