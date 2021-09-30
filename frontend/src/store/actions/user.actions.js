import { userService } from "../../services/user.service.js";
import { showErrorMsg } from '../../services/event-bus.service.js'

export function loadUsers(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function onUpdateUser(user) {
    const currUser = userService.getLoggedinUser()
    return async dispatch => {
        try {
            dispatch({ type: 'SET_USER', user })
            const updatedUser = await userService.update(user);
            return updatedUser
        } catch (err) {
            dispatch({ type: 'SET_USER', user: currUser })
            return currUser;
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            console.log('Cannot login', err)
            throw err
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user;
        }
        catch (err) {
            throw err
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}
