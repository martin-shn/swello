export function togglePopover(popoverListId) {
  return async dispatch => {
    dispatch({ type: 'SET_POPOVER', popoverListId });
  };
}

export function setCardPopover(name, anchorEl, props) {
  return dispatch => {
    dispatch({
      type: 'SET_CARD_POPOVER',
      name,
      anchorEl,
      props,
    });
  };
}

export function closeCardPopover() {
  return dispatch => {
    dispatch({
      type: 'SET_CARD_POPOVER',
      name: null,
      anchorEl: null,
      props: null,
    });
  };
}

export function showLoadingPage() {
  return async dispatch => {
    dispatch({ type: 'SHOW_LOADING_PAGE' });
  };
}

export function toggleSideMenu() {
  return async dispatch => {
    dispatch({ type: 'TOGGLE_SIDE_MENU' });
  };
}

export function hideLoadingPage() {
  return async dispatch => {
    dispatch({ type: 'HIDE_LOADING_PAGE' });
  };
}
