const logger = require('../../services/logger.service');
const templateService = require('./template.service');

async function getTemplates(req, res) {
  try {
    const templates = await templateService.query(req.params);
    res.send(templates);
  } catch (err) {
    logger.error('Cannot get templates', err);
    res.status(500).send({ err: 'Failed to get templates' });
  }
}

async function getById(req, res) {
  try {
    const templateId = req.params.id;
    const template = await templateService.getById(templateId);
    res.send(template);
  } catch (err) {
    logger.error('Failed to get template');
    res.status(500).send({ err: 'Failed to get template' });
  }
}
async function deleteTemplate(req, res) {
  try {
    await templateService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete template', err);
    res.status(500).send({ err: 'Failed to delete template' });
  }
}

async function addTemplate(req, res) {
  try {
    let template = req.body;
    template = await templateService.add(template);
    res.send(template);
  } catch (err) {
    console.log(err);
    logger.error('Failed to add template', err);
    res.status(500).send({ err: 'Failed to add template' });
  }
}

async function updateTemplate(req, res) {
  try {
    const template = req.body;
    const updatedTemplate = await templateService.update(template);
    const alsStore = asyncLocalStorage.getStore();
    const userId = alsStore.userId;
    socketService.broadcast({
      type: socketService.SOCKET_EVENT_BOARD_UPDATED,
      data: updatedTemplate,
      room: updatedTemplate._id,
      userId,
    });
    res.json(updatedTemplate);
  } catch (err) {
    logger.error('Failed to update template');
    res.status(500).send({ err: 'Failed to update template' });
  }
}

module.exports = {
  getTemplates,
  deleteTemplate,
  addTemplate,
  updateTemplate,
  getById,
};
