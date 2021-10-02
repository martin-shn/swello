import _ from 'lodash';
import { utilService } from '../util.service';


export function addList(board, listTitle) {
    const id = utilService.makeId();
    const list = { id, title: listTitle, cards: [], style: {} };
    board.lists.push(list);
    return board;
}

export function copyList(board, list, listTitle) {
    const copiedList = JSON.parse(JSON.stringify(list));
    copiedList.title = listTitle;
    copiedList.id = utilService.makeId();
    const listIdx = board.lists.findIndex(currList => currList.id === list.id);
    board.lists.splice(listIdx + 1, 0, copiedList)
    return board;
}

export function moveList(board, currIdx, newIdx) {
    const currList = board.lists[currIdx];
    board.lists.splice(currIdx, 1);
    board.lists.splice(newIdx, 0, currList)
    return board;
}

export function updateList(board, updatedList) {
    board.lists.forEach((list, idx) => {
        if (list.id === updatedList.id) board.lists[idx] = updatedList;
    });
    return board;
}

export function moveAllCardsToList(board, currListId, newListId) {
    const currListIdx = board.lists.findIndex(list => list.id === currListId)
    const newListIdx = board.lists.findIndex(list => list.id === newListId)
    const cardsList = board.lists[currListIdx].cards;
    board.lists[newListIdx].cards.push(...cardsList)
    board.lists[currListIdx].cards = [];
    return board;
}

export function sortList(board, list, sortBy) {
    const listCopy = _.cloneDeep(list)
    if (sortBy === 'date-new') {
        listCopy.cards.sort((card1, card2) => card2.createdAt - card1.createdAt)
    } else if (sortBy === 'date-old') {
        listCopy.cards.sort((card1, card2) => card1.createdAt - card2.createdAt)
    } else {
        listCopy.cards.sort((card1, card2) => card1.title.localeCompare(card2.title))
    }
    board.lists = board.lists.map(list => list.id === listCopy.id ? listCopy : list)
    return board;
}