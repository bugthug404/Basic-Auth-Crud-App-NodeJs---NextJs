import Joi from "joi";
import { UserModel } from "./user-model";
export const signUpSchema = Joi.object<UserModel>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required().lowercase(),
  mobile: Joi.string().required(),
  profession: Joi.string().required(),
  address: Joi.string().required(),
  role: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
