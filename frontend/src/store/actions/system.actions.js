export function toggleMenu(isOpen, id, anchor) {
  return dispatch => {
    dispatch({ type: 'TOGGLE_MENU', menu: { isOpen, id, anchor } });
  };
}

export function togglePopover(popoverListId) {
  return async dispatch => {
    dispatch({ type: 'SET_POPOVER', popoverListId });
  };
}

export function setCardPopover(name, anchorEl, props, placement) {
  return dispatch => {
    dispatch({
      type: 'SET_CARD_POPOVER',
      name,
      anchorEl,
      props,
      placement,
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
  return dispatch => {
    dispatch({ type: 'SHOW_LOADING_PAGE' });
  };
}

export function toggleSideMenu() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_SIDE_MENU' });
  };
}

export function hideLoadingPage() {
  return dispatch => {
    dispatch({ type: 'HIDE_LOADING_PAGE' });
  };
}

export function setQuickEdit(cardQuickEdit) {
  return dispatch => {
    dispatch({ type: 'SET_QUICK_EDIT', cardQuickEdit });
  };
}
