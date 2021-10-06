const initialState = {
  boards: [],
  templates: null,
  board: null,
  isFullLabels: false,
  labelsClass: '',
  filterBy: { text: '', memberIds: [], labelIds: [], dueDate: { diff: Infinity, isComplete: null } },
  draggedItem: null
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: { ...action.board } };
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    case 'SET_TEMPLATES':
      return { ...state, templates: action.templates };
    case 'CLEAR_BOARD':
      return { ...state, board: null };
    case 'SET_FULL_LABELS':
      return { ...state, isFullLabels: action.isFullLabels };
    case 'SET_LABELS_CLASS':
      return { ...state, labelsClass: action.labelsClass };
    case 'SET_FILTER':
      return { ...state, filterBy: action.filterBy };
    case 'CLEAR_FILTER':
      return { ...state, filterBy: initialState.filterBy };
    case 'SET_DRAGGED_ITEM':
      return { ...state, draggedItem: action.draggedItem }
    default:
      return state;
  }
}
