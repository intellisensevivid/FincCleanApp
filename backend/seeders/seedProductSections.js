const { ProductSection } = require("../models/Product");

const seedProductSection = async (business) => {
  const sections = [
    { name: "washDryFold", business: business },
    { name: "retail", business: business },
    { name: "pickupAndDelivery", business: business },
    { name: "alterationsAndRepair", business: business },
    { name: "dryCleaning", business: business },
  ];

  try {
    await ProductSection.insertMany(sections);
    console.log("ProductSection seeded successfully");
  } catch (err) {
    console.error("Error seeding ProductSection:", err);
  }
};

module.exports = seedProductSection;
