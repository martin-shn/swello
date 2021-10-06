import { boardService } from '../../services/board.service';
import _ from 'lodash';
import { socketService, SOCKET_EVENT_BOARD_UPDATED, SOCKET_EVENT_ITEM_DRAGGED } from '../../services/socket.service';

let gBoard = null;

export function loadBoards(filterBy) {
  return async dispatch => {
    try {
      const boards = await boardService.query(filterBy);
      dispatch({ type: 'SET_BOARDS', boards });
      socketService.on(SOCKET_EVENT_ITEM_DRAGGED, draggedItem => {
        dispatch({ type: 'SET_DRAGGED_ITEM', draggedItem })
      })
    } catch (err) {
      console.error(err);
    }
  };
}

export function loadTemplates() {
  return async dispatch => {
    try {
      const templates = await boardService.templatesQuery();
      dispatch({ type: 'SET_TEMPLATES', templates });
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
      socketService.on(SOCKET_EVENT_BOARD_UPDATED, board => {
        dispatch({ type: 'SET_BOARD', board });
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function clearBoard() {
  return dispatch => {
    dispatch({ type: 'CLEAR_BOARD' });
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

export function setFilter(filterBy) {
  return dispatch => {
    dispatch({
      type: 'SET_FILTER',
      filterBy,
    });
  };
}

export function clearFilter() {
  return dispatch => {
    dispatch({
      type: 'CLEAR_FILTER',
    });
  };
}
