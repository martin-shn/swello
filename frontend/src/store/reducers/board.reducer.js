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
    case 'UPDATE_BOARD':
      return { ...state, board: action.board };
    // return { ...state, boards: state.boards.map(board => board._id === action.board._id ? action.board : board) }
    default:
      return state;
  }
}
