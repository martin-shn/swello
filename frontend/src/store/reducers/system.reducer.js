const initialState = {
  popoverListId: null,
  isLoadingPage: true,
  cardPopover: { name: '', anchorEl: null, props: null, placement: null },
  isSideMenuOpen: false,
  menu: { isOpen: false, id: null, anchor: null },
  cardQuickEdit: null,
};

export function systemReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POPOVER':
      return { ...state, popoverListId: action.popoverListId };
    case 'SET_CARD_POPOVER':
      const { name, anchorEl, props, placement } = action;
      return {
        ...state,
        cardPopover: { name, anchorEl, props, placement },
      };
    case 'SHOW_LOADING_PAGE':
      return { ...state, isLoadingPage: true };
    case 'HIDE_LOADING_PAGE':
      return { ...state, isLoadingPage: false };
    case 'TOGGLE_SIDE_MENU':
      return { ...state, isSideMenuOpen: !state.isSideMenuOpen };
    case 'TOGGLE_MENU':
      return { ...state, menu: { ...action.menu } };
    case 'SET_QUICK_EDIT':
      return { ...state, cardQuickEdit: action.cardQuickEdit };
    default:
      return state;
  }
}
