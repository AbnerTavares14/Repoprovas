"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
var userSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required()
});
exports["default"] = userSchema;
