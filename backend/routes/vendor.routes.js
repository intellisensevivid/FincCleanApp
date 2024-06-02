const { Router } = require("express");
const {
  createVendor,
  getVendors,
  getVendor,
} = require("../controllers/vendor.controllers");
const upload = require("../util/storage");

const router = Router();

router.route("/").post(upload.single("image"), createVendor).get(getVendors);
router.route("/:id").get(getVendor);

module.exports = router;
