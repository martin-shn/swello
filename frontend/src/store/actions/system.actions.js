import { userService } from "../../services/user.service.js";
import { showErrorMsg } from '../../services/event-bus.service.js'

export function showPopover(popoverListId) {
    return async dispatch => {
        dispatch({ type: 'SET_POPOVER', popoverListId })
    }
}

export function hidePopover() {
    return async dispatch => {
        dispatch({ type: 'SET_POPOVER', popoverListId: null })
    }
}

export function showLoadingPage() {
    return async dispatch => {
        dispatch({ type: 'SHOW_LOADING_PAGE' })
    }
}

export function hideLoadingPage() {
    return async dispatch => {
        dispatch({ type: 'HIDE_LOADING_PAGE' })
    }
}
