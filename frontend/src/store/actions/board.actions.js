import { boardService } from '../../services/board.service';

export function loadBoards() {
  try {
    return async dispatch => {
      await boardService.query();
    };
  } catch (err) {
    console.error(err);
  }
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

export function updateBoard(updatedBoard) {
  return async dispatch => {
    try {
      const board = await boardService.update(updatedBoard);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.error(err);
    }
  };
}
