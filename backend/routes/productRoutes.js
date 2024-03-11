const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductSection,
  getAllProductSections,
  updateProductSection,
  deleteProductSection,
  getStoreProducts,
} = require("../controllers/productControllers");
const adminMiddleware = require("../middleware/adminMiddleware");
const schemaValidator = require("../middleware/schemaValidator");
const { verifyToken } = require("../middleware/authMiddleware");

// Product Section Routes
router.post(
  "/sections",
  verifyToken,
  schemaValidator("productSectionCreate"),
  adminMiddleware,
  createProductSection
);
router.get("/sections", verifyToken, adminMiddleware, getAllProductSections);
router.put(
  "/sections/:sectionId",
  verifyToken,
  adminMiddleware,
  updateProductSection
);
router.delete(
  "/sections/:sectionId",
  verifyToken,
  adminMiddleware,
  deleteProductSection
);

// gets all products and sections for a store
router.get("/store", verifyToken, getStoreProducts);

// Product Routes
router.post("/", verifyToken, schemaValidator("productCreate"), createProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/:productId", verifyToken, getProductById);
router.put("/:productId", verifyToken, updateProduct);
router.delete("/:productId", verifyToken, deleteProduct);

module.exports = router;
