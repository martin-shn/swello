import { utilService } from '../util.service';
import { httpService } from '../http.service';
import _ from 'lodash';
import { boardService } from '../board.service';

export const cardService = {
  getCardById,
  getCardFromArchive,
  toggleLabel,
  addChecklist,
  deleteChecklist,
  addChecklistItem,
  updateChecklistItem,
  removeChecklistItem,
  getListOfCard,
  getLocationResults,
  toggleCardMember,
  checkDueDate,
  getLocationData,
  updateCard,
};

// CARD FUNCTIONS - returns updated board

export function updateCard(board, updatedCard, activity, isArchived) {
  const cloneBoard = _.cloneDeep(board);
  if (!isArchived) {
    cloneBoard.lists.forEach(list => {
      if (!list.cards) return;
      list.cards.forEach((card, idx) => {
        if (card.id === updatedCard.id) list.cards[idx] = updatedCard;
      });
    });
  } else {
    const idx = cloneBoard.archive.cards.findIndex(archivedCard => archivedCard.card.id === updatedCard.id);
    cloneBoard.archive.cards[idx].card = updatedCard;
  }
  if (activity) {
    if (!cloneBoard.activities) cloneBoard.activities = [];
    cloneBoard.activities.unshift(activity);
  }
  return cloneBoard;
}

export function addCard(board, list, cardTitle, isTopAdd) {
  const card = {
    id: utilService.makeId(),
    title: cardTitle,
    createdAt: Date.now(),
  };
  const updatedBoard = _.cloneDeep(board);
  const listIdx = updatedBoard.lists.findIndex(currList => currList.id === list.id);
  if (isTopAdd) {
    updatedBoard.lists[listIdx].cards.unshift(card);
  } else {
    updatedBoard.lists[listIdx].cards.push(card);
  }
  const activity = boardService.createActivity(card, 'ADD-CARD', { listTitle: list.title });
  if (!updatedBoard.activities) updatedBoard.activities = [];
  updatedBoard.activities.unshift(activity);
  return updatedBoard;
}

export function moveCard(board, currListId, currCardIdx, newListId, newCardIdx) {
  const cloneBoard = _.cloneDeep(board);
  const currListIdx = cloneBoard.lists.findIndex(list => list.id === currListId);
  const currList = cloneBoard.lists[currListIdx];
  const currCard = currList.cards[currCardIdx];
  if (currListId === newListId) {
    if (currCardIdx === newCardIdx) return cloneBoard;
    currList.cards.splice(currCardIdx, 1);
    currList.cards.splice(newCardIdx, 0, currCard);
  } else {
    currList.cards.splice(currCardIdx, 1);
    const newListIdx = cloneBoard.lists.findIndex(list => list.id === newListId);
    const newList = cloneBoard.lists[newListIdx];
    newList.cards.splice(newCardIdx, 0, currCard);
  }
  return cloneBoard;
}

export function copyCard(board, card, listId, idx, title, keep) {
  const cardToCopy = { ...card, title, id: utilService.makeId() };
  if (!keep.checklists) delete cardToCopy.checklists;
  if (!keep.label) delete cardToCopy.labelIds;
  if (!keep.members) delete cardToCopy.members;
  if (!keep.attachments) delete cardToCopy.attachments;
  const listIdx = board.lists.findIndex(list => list.id === listId);
  board.lists[listIdx].cards.splice(idx, 0, cardToCopy);
  return board;
}

export function archiveCard(board, card) {
  const listIdx = board.lists.findIndex(list => list.cards.some(currCard => currCard.id === card.id));
  const cardIdx = board.lists[listIdx].cards.findIndex(currCard => currCard.id === card.id);
  board.lists[listIdx].cards.splice(cardIdx, 1);
  board.archive.cards.push({ listId: board.lists[listIdx].id, idx: cardIdx, card });
  return board;
}

export function unarchiveCard(board, cardId) {
  const archivedCard = board.archive.cards.find(archivedCard => archivedCard.card.id === cardId);
  const listIdx = board.lists.findIndex(list => list.id === archivedCard.listId);
  if (listIdx === -1) {
    const archivedListIdx = board.archive.lists.findIndex(archivedList => archivedList.list.id === archivedCard.listId);
    board.archive.lists[archivedListIdx].list.cards.splice(archivedCard.idx, 0, archivedCard.card);
  } else {
    board.lists[listIdx].cards.splice(archivedCard.idx, 0, archivedCard.card);
  }
  const archivedCardIdx = board.archive.cards.findIndex(
    currArchivedCard => currArchivedCard.card.id === archivedCard.card.id
  );
  board.archive.cards.splice(archivedCardIdx, 1);
  return board;
}

export function removeCard(board, cardId) {
  const idx = board.archive.cards.findIndex(archivedCard => archivedCard.id === cardId);
  board.archive.cards.splice(idx, 1);
  return board;
}

// CARD FUNCTIONS - returns updated card

function getCardById(board, cardId) {
  for (const list of board.lists) {
    if (!list.cards) continue;
    for (const card of list.cards) {
      if (card.id === cardId) return card;
    }
  }  
  return null;
}

function getCardFromArchive(board, cardId) {
  return board.archive.cards.find(archivedCard => archivedCard.card.id === cardId);
}

// General

function getListOfCard(board, cardId) {
  for (const list of board.lists) {
    if (!list.cards) continue;
    for (const card of list.cards) {
      if (card.id === cardId) return list;
    }
  }
  // finding the card if it's archived
  const archivedCard = board.archive.cards.find(archivedCard => archivedCard.card.id === cardId);
  if (archivedCard) {
    const list = board.lists.find(list => list.id === archivedCard.listId);
    return list;
  }
  return null;
}
// Labels

function toggleLabel(card, label) {
  if (!card.labelIds) card.labelIds = [];
  const idx = card.labelIds.findIndex(currLabelId => currLabelId === label.id);
  const activity = boardService.createActivity(card, 'ADD-LABEL', { label });
  if (idx === -1) {
    card.labelIds.push(label.id);
  } else {
    card.labelIds.splice(idx, 1);
    activity.type = 'REMOVE-LABEL';
  }
  return { activity, card };
}

// Checklists

function addChecklist(card, title) {
  if (!card.checklists) card.checklists = [];
  const checklist = { id: utilService.makeId(), title, items: [] };
  card.checklists.push(checklist);
  return card;
}

function deleteChecklist(card, checklistId) {
  const updatedChecklists = card.checklists.filter(checklist => checklist.id !== checklistId);
  card.checklists = updatedChecklists;
  return card;
}

function addChecklistItem(card, checklistId, item) {
  const listIdx = card.checklists.findIndex(checklist => checklist.id === checklistId);
  item.id = utilService.makeId();
  if (!card.checklists[listIdx].items) card.checklists[listIdx].items = [];
  card.checklists[listIdx].items.push(item);
  return card;
}

function removeChecklistItem(card, checklistId, itemId) {
  const listIdx = card.checklists.findIndex(checklist => checklist.id === checklistId);
  const itemIdx = card.checklists[listIdx].items.findIndex(item => item.id === itemId);
  if (listIdx !== -1 && itemId !== -1) card.checklists[listIdx].items.splice(itemIdx, 1);
  return card;
}

function updateChecklistItem(card, checklistId, updatedItem) {
  const listIdx = card.checklists.findIndex(checklist => checklist.id === checklistId);
  card.checklists[listIdx].items.forEach((item, itemIdx) => {
    if (item.id === updatedItem.id) {
      card.checklists[listIdx].items[itemIdx] = updatedItem;
      return;
    }
  });
  return card;
}

// Location

const googleKey = process.env.REACT_APP_GOOGLE_API;
async function getLocationData(locationId) {
  // const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${locationId}&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry&key=${key}`
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationId}&key=${googleKey}&fields=formatted_address,name,geometry`;
  return await httpService.getFromApi(url);
}

async function getLocationResults(search) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${googleKey}`;
  return await httpService.getFromApi(url);
}

// Card Members:

function toggleCardMember(member, card) {
  if (!card.members) card.members = [];
  const memberIdx = card.members.findIndex(cardMember => cardMember._id === member._id);
  let isAdd = false;
  if (memberIdx !== -1) {
    card.members.splice(memberIdx, 1);
  } else {
    isAdd = true;
    card.members.push(member);
  }
  const activity = { type: isAdd ? 'ADD-MEMBER' : 'REMOVE-MEMBER', values: { member } };
  return { card, activity };
}

// Due date:

function checkDueDate(dueDate) {
  const hour = 60 * 60 * 1000;
  const now = Date.now();
  if (dueDate.isComplete) return 'complete';
  if (!dueDate.date) return 'no-date';
  if (dueDate.date < now && dueDate.date + 24 * hour > now) return 'overdue-recent'; // less than 24 hours since overdue
  if (dueDate.date < now) return 'overdue';
  if (dueDate.date - now < hour) return 'due-soon'; // less than 1 hour until overdue
  return 'normal';
}
