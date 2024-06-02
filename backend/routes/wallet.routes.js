const { Router } = require("express");
const { getWallet } = require("../controllers/wallet.controllers");
const { verifyToken } = require("../middleware/auth.middleware");

const router = Router();

router.get("/", verifyToken, getWallet);

module.exports = router;
