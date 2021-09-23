import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
