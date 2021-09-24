import { boardService } from '../../services/board.service';

export function loadBoards(filterBy) {
  try {
    return async dispatch => {
      const boards = await boardService.query(filterBy);
      dispatch({ type: 'SET_BOARDS', boards });
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

export function createBoard(newBoard) {
  return async dispatch => {
    try {
      const board = await boardService.add(newBoard);
      dispatch({ type: 'SET_BOARD', board });
      return board;
    } catch (err) {
      console.error(err);
    }
  };
}
