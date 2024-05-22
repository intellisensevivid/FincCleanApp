const { Router } = require("express");
const { getCountries } = require("../controllers/country.controller");

const router = Router();

router.get("/", getCountries);

module.exports = router;
