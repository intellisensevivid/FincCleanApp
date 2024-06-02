const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/admin.middleware");
const schemaValidator = require("../middleware/schema.validator");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getAllStores,
  queryStore,
  getStoreById,
} = require("../controllers/store.controllers");

router.get("/search", queryStore);
router.get("/", verifyToken, getAllStores);
router.get("/:businessId", getStoreById);

// router.post("/",verifyToken,adminMiddleware, createShift)
// router.patch("/:shiftId", verifyToken,adminMiddleware, createShift)
// router.delete("/:shiftId", verifyToken, adminMiddleware, deleteShift)

module.exports = router;
