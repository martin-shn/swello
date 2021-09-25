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