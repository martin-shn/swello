const initialState = {
  popoverListId: null,
  isLoadingPage: true,
  cardPopover: { name: '', anchorEl: null, props: null },
  isSideMenuOpen: false,
  menu: {isOpen: false, id: null, anchor: null},
};

export function systemReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POPOVER':
      return { ...state, popoverListId: action.popoverListId };
    case 'SET_CARD_POPOVER':
      const { name, anchorEl, props } = action;
      return {
        ...state,
        cardPopover: { name, anchorEl, props },
      };
    case 'SHOW_LOADING_PAGE':
      return { ...state, isLoadingPage: true };
    case 'HIDE_LOADING_PAGE':
      return { ...state, isLoadingPage: false };
    case 'TOGGLE_SIDE_MENU':
      return { ...state, isSideMenuOpen: !state.isSideMenuOpen };
    case 'TOGGLE_MENU':
      return { ...state, menu: {...action.menu} };
    default:
      return state;
  }
}
