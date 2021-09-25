import { userService } from '../../services/user.service.js';

const initialState = {
  popoverListId: null,
  isLoadingPage: true,
};

export function systemReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case 'SET_POPOVER':
      newState = { ...state, popoverListId: action.popoverListId }
      break;
    case 'SHOW_LOADING_PAGE':
      newState = { ...state, isLoadingPage: true }
      break;
    case 'HIDE_LOADING_PAGE':
      newState = { ...state, isLoadingPage: false }
      break;
    default:
      return state;
  }

  window.ss = newState;
  return newState;
}
