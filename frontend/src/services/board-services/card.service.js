import { utilService } from '../util.service';

export const cardService = {
  getCardById,
  toggleLabel,
  addChecklist,
  deleteChecklist,
  addChecklistItem,
  updateChecklistItem,
  removeChecklistItem,
  getListOfCard,
};

// CARD FUNCTIONS - returns updated board

export function updateCard(board, updatedCard, activity) {
  board.lists.forEach(list => {
    if (!list.cards) return;
    list.cards.forEach((card, idx) => {
      if (card.id === updatedCard.id) list.cards[idx] = updatedCard;
    });
  });
  // board.activities.push(activity);
  return board;
}

export function addCard(board, list, cardTitle, isTopAdd) {
  const card = {
    id: utilService.makeId(),
    title: cardTitle,
  };
  const listIdx = board.lists.findIndex(currList => currList.id === list.id);
  if (isTopAdd) {
    board.lists[listIdx].cards.unshift(card);
  } else {
    board.lists[listIdx].cards.push(card);
  }
  return board;
}

export function moveCard(board, currListId, currCardIdx, newListId, newCardIdx) {
  const currListIdx = board.lists.findIndex(list => list.id === currListId)
  const currList = board.lists[currListIdx]
  const currCard = currList.cards[currCardIdx]
  if (currListId === newListId) {
    if (currCardIdx === newCardIdx) return board;
    currList.cards.splice(currCardIdx, 1);
    currList.cards.splice(newCardIdx, 0, currCard)
  } else {
    currList.cards.splice(currCardIdx, 1);
    const newListIdx = board.lists.findIndex(list => list.id === newListId)
    const newList = board.lists[newListIdx]
    newList.cards.splice(newCardIdx, 0, currCard)
  }
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

function toggleLabel(card, labelId) {
  if (!card.labelIds) card.labelIds = [];
  const idx = card.labelIds.findIndex(currLabelId => currLabelId === labelId);
  if (idx === -1) {
    card.labelIds.push(labelId);
  } else {
    card.labelIds.splice(idx, 1);
  }
  return card;
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
