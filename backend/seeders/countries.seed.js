const { getCodes, getNames } = require("country-list");
const Country = require("../models/country.model");

const codes = getCodes();
const names = getNames();
const countries = [];

for (let i = 0; i < codes.length; i++) {
  countries.push({
    code: codes[i],
    name: names[i],
  });
}

const seedCountries = async () => {
  try {
    await Country.insertMany(countries);
  } catch (e) {}
};

module.exports = seedCountries;
