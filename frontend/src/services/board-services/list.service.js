import { differenceInDays, isFuture, isPast } from 'date-fns';
import _ from 'lodash';
import { utilService } from '../util.service';
export const listService = { filterLists };

function filterLists(lists, filterBy) {
  // move this logic to backend later?
  const { labelIds, memberIds, text, dueDate } = filterBy;
  const textRegex = new RegExp(text, 'i');
  const filteredLists = lists.map(list => {
    const filteredCards = list.cards.filter(card => {
      // text filter:
      const textCondition = !text || textRegex.test(card.title);
      // label filter:
      const labelCondition =
        !labelIds.length ||
        (labelIds[0] === 'NO-LABELS' && _.isEmpty(card.labelIds)) ||
        card.labelIds?.some(labelId => filterBy.labelIds.includes(labelId));
      // member filter:
      const memberCondition =
        !memberIds.length ||
        (memberIds[0] === 'NO-MEMBERS' && _.isEmpty(card.members)) ||
        card.members?.some(member => filterBy.memberIds.includes(member._id));
      // due-date date filter:
      const diffDays = differenceInDays(card.dueDate?.date, new Date(Date.now()));
      const dueDateCondition =
        dueDate.diff === Infinity || // No date filter set
        (dueDate.diff === 'OVERDUE' && isPast(card.dueDate?.date)) ||
        (isFuture(card.dueDate?.date) && diffDays < dueDate.diff) || // due date is in the future and due less than filter days
        (dueDate.diff === 'NONE' && !card.dueDate?.date); // card has no duedate
      // due-date isComplete filter:
      const dueCompleteCondition =
        dueDate.isComplete === null ||
        (dueDate.isComplete && card.dueDate?.isComplete) ||
        (dueDate.isComplete === false && !card.dueDate?.isComplete);
      // final check:
      return labelCondition && memberCondition && textCondition && dueDateCondition && dueCompleteCondition;
    });
    // after filter is done:
    return { ...list, cards: filteredCards };
  });
  // return filteredLists.filter(list => list.cards.length > 0); // remove empty lists - removed this line because it will always filter out empty lists
  return filteredLists;
}

export function addList(board, listTitle) {
  const id = utilService.makeId();
  const list = { id, title: listTitle, cards: [], style: {} };
  board.lists.push(list);
  return board;
}

export function copyList(board, list, listTitle) {
  const copiedList = _.cloneDeep(list);
  copiedList.title = listTitle;
  copiedList.id = utilService.makeId();
  copiedList.cards.forEach(card => card.id = utilService.makeId())
  const listIdx = board.lists.findIndex(currList => currList.id === list.id);
  board.lists.splice(listIdx + 1, 0, copiedList);
  return board;
}

export function moveList(board, currIdx, newIdx) {
  const currList = board.lists[currIdx];
  board.lists.splice(currIdx, 1);
  board.lists.splice(newIdx, 0, currList);
  return board;
}

export function updateList(board, updatedList) {
  board.lists.forEach((list, idx) => {
    if (list.id === updatedList.id) board.lists[idx] = updatedList;
  });
  return board;
}

export function moveAllCardsToList(board, currListId, newListId) {
  const currListIdx = board.lists.findIndex(list => list.id === currListId);
  const newListIdx = board.lists.findIndex(list => list.id === newListId);
  const cardsList = board.lists[currListIdx].cards;
  board.lists[newListIdx].cards.push(...cardsList);
  board.lists[currListIdx].cards = [];
  return board;
}

export function sortList(board, list, sortBy) {
  const listCopy = _.cloneDeep(list);
  if (sortBy === 'date-new') {
    listCopy.cards.sort((card1, card2) => card2.createdAt - card1.createdAt);
  } else if (sortBy === 'date-old') {
    listCopy.cards.sort((card1, card2) => card1.createdAt - card2.createdAt);
  } else {
    listCopy.cards.sort((card1, card2) => card1.title.localeCompare(card2.title));
  }
  board.lists = board.lists.map(list => (list.id === listCopy.id ? listCopy : list));
  return board;
}

export function archiveList(board, list) {
  const listIdx = board.lists.findIndex(currList => currList.id === list.id)
  board.lists.splice(listIdx, 1)
  board.archive.lists.push({ idx: listIdx, list })
  return board;
}

export function unarchiveList(board, archivedList) {
  const archivedListIdx = board.archive.lists.findIndex(
    currArchivedList => currArchivedList.list.id === archivedList.list.id
  );
  board.archive.lists.splice(archivedListIdx, 1);
  board.lists.splice(archivedList.idx, 0, archivedList.list);
  return board;
}
