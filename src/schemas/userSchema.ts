import Joi from "joi";
import { users } from "@prisma/client";

const userSchema = Joi.object<users>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default userSchema;