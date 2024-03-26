import Joi from "joi";
import { tlds } from "@hapi/tlds";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*()])(?=.{8,})"
);

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required()
    .label("Email Address"),
  password: Joi.string()
    .pattern(PASSWORD_REGEX)
    .min(8)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!.@#$%^&*())",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
});

export const signUpSchema = Joi.object().keys({
  companyName: Joi.string().required().label("Company Name"),
  location: Joi.string().required().label("City"),
  country: Joi.string().required().label("Country"),
  numberOfStores: Joi.string()
    .valid("1", "2", "3", "4", "5", "6", "7", "8", "9", "10 or more")
    .required()
    .label("Number of Stores"),
  fullName: Joi.string().required().label("Full Name"),
  phoneNumber: Joi.string().required().label("Phone Number"),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required()
    .label("Email Address"),
  password: Joi.string()
    .pattern(PASSWORD_REGEX)
    .min(8)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!.@#$%^&*())",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
});

export const resetPasswordSchema = Joi.object().keys({
  newPassword: Joi.string()
    .pattern(PASSWORD_REGEX)
    .min(8)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!.@#$%^&*())",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.string().required().label("Confirm Password"),
});

export const configureStoreSchema = Joi.object().keys({
  language: Joi.string().valid("english").required().label("Language"),
  pickupAndDelivery: Joi.string()
    .valid("yes", "no")
    .required()
    .label("Pickup and Delivery"),
});

export const addCustomerSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  telephone: Joi.string().required().label("Telephone"),
  secondaryTelephone: Joi.string()
    .optional()
    .allow("")
    .label("Secondary Telephone"),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .label("Email"),
  streetAddress: Joi.string().required().label("Street Address"),
  aptNumber: Joi.string().label("Apt Number"),
  city: Joi.string().required().label("City"),
  postCode: Joi.string().optional().allow("").label("Post Code"),
  driverInstructions: Joi.string()
    .optional()
    .allow("")
    .label("Driver Instructions"),
  notes: Joi.string().optional().allow("").label("Notes"),
  privateNotes: Joi.string().optional().allow("").label("Private Notes"),
  priceList: Joi.string().label("Price List"),
  paymentMethod: Joi.string()
    .valid("storeDefault", "cash", "card", "payOnCollection")
    .label("Payment Method"),
  marketing: Joi.string().valid("yes", "no").label("Marketing Opt-in"),
  invoiceStyle: Joi.string().label("Invoice Style"),
  starch: Joi.string()
    .valid("noPreference", "starch", "noStarch", "lightStarch", "heavyStarch")
    .label("Starch"),
});
