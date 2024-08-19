const { Router } = require('express');
const dedefaultControllersfaultController = require('../controllers/newMessageControllers.js');
const router = Router();

router.get('/', defaultController.printMessages);

module.exports = router;
