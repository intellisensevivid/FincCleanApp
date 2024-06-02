const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    maxLength: 255,
  },
});

ReviewSchema.statics.getAverageReview = async function (vendor) {
  let count = 0;
  const reviews = await this.find({ vendor })
    .select(["_id", "rating"])
    .populate("user", ["_id", "fullName", "email"]);

  reviews.forEach((element) => {
    count += element.rating;
  });

  let rating = count / reviews.length;
  rating = Math.round(rating) === rating ? `${rating}.0` : rating;
  const output = String(rating).split(".");

  return `${output[0]}.${output[1][0]}`;
};

module.exports = model("Review", ReviewSchema);
