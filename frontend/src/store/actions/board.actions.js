import { boardService } from '../../services/board.service';
import _ from 'lodash';

let gBoard = null;

export function loadBoards(filterBy) {
  return async dispatch => {
    try {
      const boards = await boardService.query(filterBy);
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.error(err);
    }
  };
}

export function loadBoard(id) {
  return async dispatch => {
    try {
      const board = await boardService.getById(id);
      gBoard = _.cloneDeep(board);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.error(err);
    }
  };
}

export function updateBoard(updatedBoard) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_BOARD', board: updatedBoard });
      const board = await boardService.update(updatedBoard);
      gBoard = _.cloneDeep(board);
      return board;
    } catch (err) {
      dispatch({ type: 'SET_BOARD', board: _.cloneDeep(gBoard) });
      console.error(err);
      return gBoard;
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

export function setFullLabels(isFullLabels) {
  return dispatch => {
    dispatch({
      type: 'SET_FULL_LABELS',
      isFullLabels,
    });
  };
}

export function setLabelsClass(labelsClass) {
  return dispatch => {
    dispatch({
      type: 'SET_LABELS_CLASS',
      labelsClass,
    });
  };
}
