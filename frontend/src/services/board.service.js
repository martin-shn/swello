import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';

export const boardService = {
  add,
  query,
  remove,
  getById,
};

window.bs = boardService;

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
<<<<<<< HEAD
  // var queryStr = (!filterBy) ? '' : `?byUser=${filterBy.byUser}`
  // return httpService.get(`board${queryStr}`)
  return storageService.query('board', filterBy)
=======
  var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`;
  // return httpService.get(`board${queryStr}`)
  return storageService.query('board', queryStr);
>>>>>>> 85d04d7c6a840e73ded576b73828661de365809c
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

  board.createdBy = userService.getLoggedinUser();
  board.createdAt = Date.now();
  const addedBoard = storageService.post('board', board);

  return addedBoard;
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
