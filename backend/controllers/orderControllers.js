const Customer = require("../models/Customer");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc  Get all Orders
// @route GET /api/orders
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
  const { business } = req.user;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const startIndex = (page - 1) * limit;
  const orders = await Order.find({ business })
    .skip(startIndex)
    .limit(limit)
    .lean();
  if (!orders) {
    return res.status(404).json({ message: "No orders found" });
  }
  res.json(orders);
});

// @desc Get all Orders for a specific store
// @route GET /api/orders/store/:storeId
// @access Private
const getAllOrdersForStore = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const startIndex = (page - 1) * limit;
  const orders = await Order.find({ business: storeId })
    .skip(startIndex)
    .limit(limit);
  if (!orders) {
    return res.status(404).json({ message: "No orders found" });
  }
  res.json(orders);
});

// @desc  Get specific Order
// @route GET /api/orders/:orderId
// @access Private
const getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { business } = req.user;
  const order = await Order.find({ _id: orderId, business: business });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
});

// @desc Update order processing status
const orderProcessing = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { processingStatus } = req.body;
  const order = await Order.findById(orderId);
})

// @desc  Create Order
// @route POST /api/orders/create
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    totalPrice,
    pickupDate,
    pickupTime,
    pickupStartDate,
    pickupEndTime,
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
  } = req.body;
  const lastOrder = await Order.findOne({ business: req.user.business }).sort(
    "-orderNumber"
  );
  const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

  const order = await Order.create({
    orderNumber: nextOrderNumber,
    ...req.body,
    totalPrice: parseFloat(totalPrice),
    createdBy: req.user._id,
    business: req.user.business,
  });

  if (!order) {
    res.status(400).json({ message: "Order creation failed" });
  }

  const customer = await Customer.findById(req.body.customer);

  if (!customer) {
    res.status(400).json({ message: "Customer not found" });
  }

  customer.orders.push(order._id);
  await customer.save();

  res.json(order);
});

// @desc  Update Order
// @route PUT /api/orders
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { business } = req.user;
  const order = await Order.findOneAndUpdate(
    { _id: orderId, business: business },
    req.body,
    {
      new: true,
    }
  );
  if (!order) {
    res
      .status(404)
      .json({ message: "You are not authorized to update this Order" });
  }

  res.json(order);
});

// @desc  Delete Order
// @route DELETE /api/orders/:orderId
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOneAndDelete({
    _id: orderId,
    business: req.user.business,
  });
  if (!order) {
    res
      .status(404)
      .json({ message: "You are not authorized to delete this Order" });
  }
  res.json({ message: "Order deleted successfully" });
});

// @desc Get all orders by a customer
// @route GET /api/orders/customer/:customerId
// @access Private
const getOrdersByCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.customerId;
  const orders = await Order.find({ customer: customerId })
    .populate("customer")
    .lean();
  res.json(orders);
});

// @desc Update order payment status
// @route PUT /api/orders/:orderId/status
// @access Private
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await Order.findOneAndUpdate(
    { _id: orderId, business: req.user.business },
    { status: status },
    {
      new: true,
    }
  );

  if (!order) {
    res
      .status(404)
      .json({ message: "You are not authorized to update this Order" });
  }

  res.json(order);
});

// @desc Update order payment status
// @route PUT /api/orders/:orderId/payment
// @access Private
const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;
  const order = await Order.findOneAndUpdate(
    { _id: orderId, business: req.user.business },
    { paymentStatus: paymentStatus },
    {
      new: true,
    }
  );

  if (!order) {
    res
      .status(404)
      .json({ message: "You are not authorized to update this Order" });
  }

  res.json(order);
});

// @desc Update order payment status
// @route PUT /api/orders/analytics
// @access Private (admin access only)
const getOrderAnalytics = asyncHandler(async (req, res) => {
  // Calculate total sales
  const totalSales = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalAmount" },
      },
    },
  ]);

  // Calculate popular products
  const popularProducts = await Order.aggregate([
    // { $unwind: "$items" },
    // {
    //   $group: {
    //     _id: "$items.product",
    //     totalQuantity: { $sum: "$items.quantity" },
    //   },
    // },
    // { $sort: { totalQuantity: -1 } },
    // { $limit: 5 },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalQuantity: { $sum: "$items.quantity" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productData",
      },
    },
    {
      $project: {
        _id: 1,
        totalQuantity: 1,
        productName: { $arrayElemAt: ["$productData.name", 0] },
      },
    },
  ]);

  // Calculate average order value
  const averageOrderValue = await Order.aggregate([
    {
      $group: {
        _id: null,
        avgAmount: { $avg: "$totalAmount" },
      },
    },
  ]);

  res.json({
    totalSales: totalSales[0] ? totalSales[0].totalAmount : 0,
    popularProducts,
    averageOrderValue: averageOrderValue[0]
      ? averageOrderValue[0].avgAmount
      : 0,
  });
});

module.exports = {
  getAllOrders,
  getAllOrdersForStore,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByCustomer,
  updateOrderStatus,
  updateOrderPaymentStatus,
  getOrderAnalytics,
};
