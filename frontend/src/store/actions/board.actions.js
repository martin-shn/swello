import { boardService } from '../../services/board.service';

export function loadBoards() {
  return async dispatch => {
    await boardService.query();
  };
}

export function loadBoard(id) {
  return async dispatch => {
    try {
      const board = await boardService.getById(id);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.error(err);
    }
  };
}
