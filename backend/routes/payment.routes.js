const { Router } = require("express");
const {
  stripePaymentIntent,
  onPaymentSuccess,
} = require("../controllers/payment.controllers");
const { verifyToken } = require("../middleware/auth.middleware");

const router = Router();

router.post("/stripe", verifyToken, stripePaymentIntent);
router.post("/complete", verifyToken, onPaymentSuccess);

module.exports = router;
