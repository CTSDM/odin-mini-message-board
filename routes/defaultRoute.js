const { Router } = require("express");
const defaultController = require("../controllers/defaultControllers");

const router = Router();

router.get("/", defaultController.printMessages);
router.get("/new", defaultController.printForm);
router.post("/new", defaultController.addMessage);
router.get("/message/:id", defaultController.printSingleMessage);
router.get("/delete", defaultController.printFormDrop);
router.post("/delete", defaultController.deleteEverything);
router.post("/fill-tables", defaultController.fillTables);

module.exports = router;
