const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "LaundryItem",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 100,
      default: 1,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * @description calculates the total price of the cart item
 * @returns the total price of items in a particular order item
 */
CartItemSchema.methods.total = async function () {
  const item = await this.populate("item", ["price", "-_id"]);

  return item.item.price * item.quantity;
};

module.exports = model("CartItem", CartItemSchema);
