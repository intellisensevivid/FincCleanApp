const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
      enum: ["Withdrawal", "Deposit"],
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema);
