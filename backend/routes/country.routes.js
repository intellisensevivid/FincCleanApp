const { Router } = require("express");
const { getCountries } = require("../controllers/country.controllers");

const router = Router();

router.get("/", getCountries);

module.exports = router;
