const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllStores,
  queryStore,
  getStoreById,
} = require("../controllers/storeController");

router.get("/", verifyToken, getAllStores);
router.get("/search", verifyToken, queryStore);
router.get("/:businessId", verifyToken, getStoreById);

// router.post("/",verifyToken,adminMiddleware, createShift)
// router.patch("/:shiftId", verifyToken,adminMiddleware, createShift)
// router.delete("/:shiftId", verifyToken, adminMiddleware, deleteShift)

module.exports = router;
