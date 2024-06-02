const Role = require("../models/role.model");

async function seedRoles() {
  const roles = [
    { name: "admin" },
    { name: "manager" },
    { name: "staff" },
    { name: "driver" },
    { name: "custom" },
  ];

  try {
    await Role.insertMany(roles);
    console.log("Roles seeded successfully");
  } catch (err) {
    console.error("Error seeding roles:", err);
  }
}

module.exports = seedRoles;
