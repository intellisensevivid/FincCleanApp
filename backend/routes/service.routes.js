const { Router } = require("express");
const {
  createService,
  getServices,
} = require("../controllers/service.controller");
const uploader = require("../util/storage");

const router = Router();

router
  .route("/")
  .post(uploader.single("image"), createService)
  .get(getServices);

module.exports = router;
