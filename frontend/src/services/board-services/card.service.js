import { utilService } from '../util.service';
import { httpService } from '../http.service';
import _ from 'lodash';
import { boardService } from '../board.service';

export const cardService = {
  getCardById,
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

export function updateCard(board, updatedCard, activity) {
  const cloneBoard = _.cloneDeep(board);
  cloneBoard.lists.forEach(list => {
    if (!list.cards) return;
    list.cards.forEach((card, idx) => {
      if (card.id === updatedCard.id) list.cards[idx] = updatedCard;
    });
  });
  if (activity) cloneBoard.activities.unshift(activity);
  return cloneBoard;
}

export function addCard(board, list, cardTitle, isTopAdd) {
  const card = {
    id: utilService.makeId(),
    createdAt: Date.now(),
    title: cardTitle,
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

// General

function getListOfCard(board, cardId) {
  for (const list of board.lists) {
    if (!list.cards) continue;
    for (const card of list.cards) {
      if (card.id === cardId) return list;
    }
  }
  return null; // shouldnt happen but anyways
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

const key = 'AIzaSyDgw0mWmcS4OoFUyLUj5oNbfo4KGzpHiYA';
async function getLocationData(locationId) {
  // const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${locationId}&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry&key=${key}`
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationId}&key=${key}&fields=formatted_address,name,geometry`;
  return await httpService.getFromApi(url);
}

async function getLocationResults(search) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${key}`;
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
