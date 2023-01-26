const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Routes
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/add", userController.form);
router.post("/add", userController.create);
router.get("/edit/:id", userController.edit);
router.post("/edit/:id", userController.update);
router.get("/view/:id", userController.viewInfo);
router.get("/delete/:id", userController.delete);
router.get("/restore/:id", userController.restore);
router.get("/activate/:id", userController.activate);
router.get("/deactivate/:id", userController.deactivate);

module.exports = router;
