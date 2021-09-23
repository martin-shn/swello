
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { boardService } from './board.service.js'

const STORAGE_KEY = 'group'
const listeners = []

export const groupService = {
    query,
    getById,
    add,
    update,
    remove,
    getEmptyGroup,
    subscribe
    
}
window.gs = groupService;

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(groupId) {
    return storageService.get(STORAGE_KEY, groupId)
}

function remove(groupId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, groupId)
}

function add(group) {
    group.id = utilService.makeId()
    return storageService.post(STORAGE_KEY, group)
}

function update(group) {
    if (group.id) {
        return storageService.put(STORAGE_KEY, group)
    } 
}

function getEmptyGroup() {
    return {
        title: "Group" + query().length+1,
        tasks: [
            {
                id: utilService.makeId(),
                title: "New Task",
            }
        ],
    }
}


function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersGroupsChanged(groups) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(groups))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(groups => {
            _notifySubscribersGroupsChanged(groups)
        }) 
})

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




