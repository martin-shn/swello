const initialState = {
  boards: [],
  currBoard: null,
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, currBoard: action.board };
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    default:
      return state;
  }
}
