const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ["Accepted", "New"],
      required: true,
      default: "New",
    },
    orderItems: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
  },
  { timestamps: { createdAt: "date_placed", updatedAt: "last_updated" } }
);

/**
 * @description calculates the total price of all cart items in the cart
 * @returns the total price of all cart items in the cart
 */

CartSchema.methods.totalPrice = async function () {
  let total = 0;
  const cart = await this.populate("orderItems");

  for (let item of cart.orderItems) {
    total += await item.total();
  }

  return total;
};

module.exports = model("Cart", CartSchema);
