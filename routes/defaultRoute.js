const { Router } = require('express');
const defaultController = require('../controllers/defaultControllers');

const router = Router();

router.get('/', defaultController.printMessages);
router.get('/new', defaultController.printForm);
router.post('/new', defaultController.getPostMessage);
router.get('/message/:id', defaultController.printSingleMessage);

module.exports = router;
