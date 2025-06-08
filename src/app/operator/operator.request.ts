import Joi from "joi";
import { joiGeneralMessage } from "../../utils/joi";

export const createAdminSchema = Joi.object({
  telephone: Joi.string()
    .pattern(/^\d+$/)
    .min(10)
    .max(15)
    .required()
    .messages(joiGeneralMessage),

  name: Joi.string()
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      ...joiGeneralMessage,
      "string.pattern.base": "{#label} tidak boleh mengandung angka atau simbol.",
    }),

  email: Joi.string().email().required().label("Email").messages(joiGeneralMessage),

  password: Joi.string()
    .min(8)
    .max(12)
    .required()
    .messages(joiGeneralMessage),

  divisionId: Joi.number().required().messages(joiGeneralMessage),
});

export const loginAdminSchema = Joi.object({
  email: Joi.string().email().required().label("Email").messages(joiGeneralMessage),
  password: Joi.string()
    .min(8)
    .max(12)
    .required()
    .messages(joiGeneralMessage),
});