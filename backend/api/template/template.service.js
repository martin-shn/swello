const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');

async function query() {
  try {
    const collection = await dbService.getCollection('template');
    const templates = await collection.find({}).toArray();
    return templates;
  } catch (err) {
    logger.error('cannot find templates', err);
    throw err;
  }
}

async function remove(templateId) {
  try {
    const collection = await dbService.getCollection('template');
    await collection.deleteOne({ _id: ObjectId(templateId) });
    return templateId;
  } catch (err) {
    logger.error(`Cannot remove template ${templateId}`, err);
    throw err;
  }
}

async function add(template) {
  try {
    const { title, style, lists, labels = [] } = template;
    const templateToAdd = {
      title,
      style,
      members: [],
      archive: {
        lists: [],
        cards: [],
      },
      lists,
      activities: [],
      isFullLabels: false,
      labels,
    };
    collection = await dbService.getCollection('template');
    await collection.insertOne(templateToAdd);
    return templateToAdd;
  } catch (err) {
    logger.error('cannot insert template', err);
    throw err;
  }
}

async function update(template) {
  try {
    const templateToSave = {
      ...template,
      _id: ObjectId(template._id),
    };
    const collection = await dbService.getCollection('template');
    await collection.updateOne({ _id: templateToSave._id }, { $set: templateToSave });
    return templateToSave;
  } catch (err) {
    logger.error(`Cannot update template ${template._id}`, err);
    throw err;
  }
}

function _makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

module.exports = {
  query,
  remove,
  add,
  update,
};
