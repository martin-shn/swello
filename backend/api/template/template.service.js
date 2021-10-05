const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  try {
    const { _id } = filterBy;
    const collection = await dbService.getCollection('template');
    const templates = await collection.find({ _id: ObjectId(_id) }).toArray();
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
    collection = await dbService.getCollection('template');
    await collection.insertOne(template);
    return template;
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

module.exports = {
  query,
  remove,
  add,
  update,
};
