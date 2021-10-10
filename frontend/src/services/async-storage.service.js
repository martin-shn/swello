// import boardData from '../data/board.json';
// import userData from '../data/user.json';

export const storageService = {
  init,
  query,
  get,
  post,
  postMany,
  put,
  remove,
};

async function init() {
  // const boards = await query('board');
  // const users = await query('user');
  // if (!boards.length) {
  //   await postMany('board', boardData);
  // }
  // if (!users.length) {
  //   await postMany('user', userData);
  // }
  // return Promise.resolve()
}

function query(entityType, filterBy, delay = 1200) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];

  if (filterBy) {
    if (filterBy.byUserId) {
      entities = entities.filter(entity => {
        return (
          entity.createdBy._id === filterBy.byUserId || entity.members.some(member => member._id === filterBy.byUserId)
        );
      });
    }

    if (filterBy.name) {
      entities = entities.filter(entity => {
        return (
          entity.fullname.toLowerCase().includes(filterBy.name.toLowerCase()) ||
          entity.username.toLowerCase().includes(filterBy.name.toLowerCase())
        );
      });
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('OOOOPs')
      resolve(entities);
    }, delay);
  });
  // return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then(entities => entities.find(entity => entity._id === entityId));
}

function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then(entities => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then(entities => {
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then(entities => {
    const idx = entities.findIndex(entity => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function postMany(entityType, newEntities) {
  return query(entityType).then(entities => {
    newEntities = newEntities.map(entity => ({
      ...entity,
      _id: entity._id === 'u101' ? 'u101' : _makeId(),
    }));
    entities.push(...newEntities);
    _save(entityType, entities);
    return entities;
  });
}
