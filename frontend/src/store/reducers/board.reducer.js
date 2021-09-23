const initialState = {
  boards: [],
  board: null,
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.board };
    case 'SET_BOARDS':
      return { ...state, boards: action.boards };
    default:
      return state;
  }
}
