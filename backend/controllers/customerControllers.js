const Customer = require("../models/Customer");
const asyncHandler = require("express-async-handler");

// @desc Create a new customer
// @route POST /api/customers
// @access Private
const createCustomer = asyncHandler(async (req, res) => {
  const { business } = req.user;
  // check for existing customer
  const existingCustomer = await Customer.findOne({
    business: business,
    $or: [{ email: req.body.email }, { telephone: req.body.telephone }],
  });

  if (existingCustomer) {
    return res
      .status(400)
      .json({ message: "Customer already exist for this store" });
  }
  const customer = await Customer.create({ ...req.body, business });
  res.status(201).json(customer);
});

// @desc Creates a customer for mobile app
// @route POST /api/customers/createAppCustomer
// @access Public
const createAppCustomer = asyncHandler(async (req, res) => {
  const { email, password, business } = req.body;
  // check for existing customer
  if (email && password) {
    const existingCustomer = await Customer.findOne({
      email,
      business,
    });
    if (existingCustomer && !existingCustomer.password) {
      existingCustomer.password = password;
      await existingCustomer.save();
      res.status(201).json(existingCustomer);
    } else {
      return res
        .status(400)
        .json({ message: "Email is already registered for this business" });
    }

    if (!existingCustomer) {
      const customer = await Customer.create({ email, password, business });
      return res.status(201).json(customer);
    }
  } else {
    return res.status(400).send("Email and password are required");
  }
});

// @desc Get all customers
// GET /api/customers
// @access Private
const getAllCustomers = asyncHandler(async (req, res) => {
  const { business } = req.user;
  const customers = await Customer.find({ business }).lean();
  res.status(200).json(customers);
});

// @desc Get a single customer
// @route GET /api/customers/:customerId
// @access Private
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.customerId);

  if (customer) {
    // Check if the customer belongs to the requesting business/store
    if (customer.business.toString() === req.user.business.toString()) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

// @desc Searches for a customer
// @route PUT /api/customers/search
// @access Private
const searchCustomers = asyncHandler(async (req, res) => {
  console.log("you here?");
  const { query } = req.query;
  const { business } = req.user;
  console.log(query);
  const customers = await Customer.aggregate([
    {
      $match: {
        business: business,
        name: { $regex: query, $options: "i" }, // Perform case-insensitive partial matching
      },
    },
    {
      $addFields: {
        score: {
          $cond: {
            if: { $eq: [{ $indexOfBytes: ["$name", query] }, -1] },
            then: 0, // Set score to 0 if query is not found in the name
            else: {
              $subtract: [
                1,
                {
                  $divide: [
                    { $indexOfBytes: ["$name", query] },
                    { $strLenBytes: "$name" },
                  ],
                },
              ],
            }, // Calculate score based on position of query in name
          },
        },
      },
    },
    {
      $sort: { score: -1 }, // Sort by score in descending order (higher score indicates better match)
    },
  ]);

  if (!customers.length) {
    return res.status(404).json({ message: "No customer found" });
  }

  res.json(customers);
});

// @desc Update a customer
// @route PUT /api/customers/:customerId
// @access Private
const updateCustomer = asyncHandler(async (req, res) => {
  const updatedFields = req.body;

  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: req.params.customerId, business: req.user.business },
    updatedFields,
    { new: true, runValidators: true }
  ).lean();

  if (!updatedCustomer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.status(200).json(updatedCustomer);
});

// @desc Delete a customer
// @route DELETE /api/customers/:customerId
// @access Private
const deleteCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const deletedCustomer = await Customer.findOneAndDelete({
    _id: customerId,
    business: req.user.business,
  });

  if (!deletedCustomer) {
    res.status(404);
    throw new Error("You are not authorized to delete this Customer");
  }

  res.json({ message: "Customer deleted successfully" });
});

module.exports = {
  createCustomer,
  createAppCustomer,
  getAllCustomers,
  searchCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
