const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    // incase if extra permissions are added to employee
    permissions: [
      {
        type: String,
      },
    ],
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationPin: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+[0-9]{1,3}[0-9]{7,15}$/gi.test(v);
        },
        message: "Please enter a valid phone number",
      },
    },
    profilePicture: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
    hourlyRate: {
      type: Number,
    },
    monthlyPay: {
      type: Number,
    },
    weeklyHours: {
      type: Number,
    },
    isLockedOut: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true, toObject: { useProjection: true } }
);

UserSchema.plugin(uniqueValidator, {
  message: "User with {PATH} already exists",
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// UserSchema.pre("findOneAndUpdate", function (next) {
//   const user = this.getUpdate();
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
