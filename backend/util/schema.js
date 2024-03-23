const Joi = require("joi");

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*()])(?=.{8,})"
);

const authRegister = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  phoneNumber: Joi.string().required(),
  companyName: Joi.string().required(),
  location: Joi.string().required(),
  numberOfStores: Joi.string().required(),
  subscription: Joi.string().optional(),
  cardNumber: Joi.number().optional(),
  expiryDate: Joi.string().optional(),
  cvv: Joi.number().optional(),
});

const authLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

const userCreate = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  phoneNumber: Joi.string().required(),
  role: Joi.string().required(),
  permissions: Joi.array(),
  hourlyRate: Joi.number(),
  monthlyPay: Joi.number(),
  weeklyHours: Joi.number(),
});

const userChangePassword = Joi.object().keys({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

const customerCreate = Joi.object().keys({
  name: Joi.string().required(),
  telephone: Joi.string().required(),
  secondaryTelephone: Joi.string().optional().allow(""),
  email: Joi.string().email(),
  streetAddress: Joi.string().required(),
  aptNumber: Joi.string(),
  city: Joi.string().required(),
  postCode: Joi.string().optional().allow(""),
  driverInstructions: Joi.string().optional().allow(""),
  notes: Joi.string().optional().allow(""),
  privateNotes: Joi.string().optional().allow(""),
  priceList: Joi.string(),
  paymentMethod: Joi.string(),
  marketing: Joi.string(),
  invoiceStyle: Joi.string(),
  starch: Joi.string(),
  orders: Joi.string(),
});

const appCustomerCreate = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  business: Joi.string(),
});

const productCreate = Joi.object().keys({
  name: Joi.string().required(),
  section: Joi.string().required(),
  image: Joi.string(),
  productType: Joi.string(),
  price: Joi.number(),
  expressPrice: Joi.number(),
  piecePerProduct: Joi.number(),
  extraDays: Joi.number(),
  upcharge: Joi.number(),
});

const productSectionCreate = Joi.object().keys({
  name: Joi.string().required(),
});

const orderCreate = Joi.object().keys({
  orderNumber: Joi.number().optional(),
  customer: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object().keys({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
        bags: Joi.array().optional(),
      })
    )
    .required(),
  orderType: Joi.string()
    .valid("inStore", "pickupAndDelivery", "pickup", "delivery")
    .required(),
  pickupDate: Joi.date().optional(),
  pickupTime: Joi.date().optional(),
  pickupStartTime: Joi.date().optional(),
  pickupEndTime: Joi.date().optional(),
  deliveryDate: Joi.date().optional(),
  deliveryStartTime: Joi.date().optional(),
  deliveryEndTime: Joi.date().optional(),
  isActive: Joi.boolean().default(true),
  isExpress: Joi.boolean().default(false),
  paymentStatus: Joi.string().valid("pending", "paid").default("pending"),
  paymentMethod: Joi.string()
    .valid("cash", "card", "check", "payOnCollection", "storeDefault")
    .default("storeDefault"),
  status: Joi.string()
    .valid("pending", "processing", "completed", "cancelled")
    .default("pending"),
  startTime: Joi.string().optional(),
  completedDate: Joi.string().optional(),
  completedTime: Joi.string().optional(),
  totalPrice: Joi.string().required(),
  createdBy: Joi.string(),
  business: Joi.string(),
});

module.exports = {
  authRegister,
  authLogin,
  userCreate,
  userChangePassword,
  customerCreate,
  appCustomerCreate,
  productCreate,
  productSectionCreate,
  orderCreate,
};
