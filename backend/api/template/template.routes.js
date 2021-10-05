const express = require('express');
const { log } = require('../../middlewares/logger.middleware');
const { addTemplate, getTemplates, deleteTemplate, updateTemplate } = require('./template.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getTemplates);
router.post('/', log, addTemplate);
router.put('/:id', log, updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
