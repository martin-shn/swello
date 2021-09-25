import { utilService } from "../util.service";

export function getCardById(board, cardId) {
    for (const list of board.lists) {
        if (!list.cards) continue;
        for (const card of list.cards) {
            if (card.id === cardId) return card;
        }
    }
    return null;
}

export function updateCard(board, updatedCard, activity) {
    board.lists.forEach(list => {
        if (!list.cards) return;
        list.cards.forEach((card, idx) => {
            if (card.id === updatedCard.id) list.cards[idx] = updatedCard;
        });
    });
    // board.activities.push(activity);
    const updatedBoard = { ...board };
    return updatedBoard;
}

export function addCard(board, list, cardTitle, isTopAdd) {
    const card = {
        id: utilService.makeId(),
        title: cardTitle
    };
    const listIdx = board.lists.findIndex(currList => currList.id === list.id)
    if (isTopAdd) {
        board.lists[listIdx].cards.unshift(card)
    } else {
        board.lists[listIdx].cards.push(card)
    }
    return board;
}