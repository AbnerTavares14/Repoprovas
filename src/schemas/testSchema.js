"use strict";
exports.__esModule = true;
var joi_1 = require("joi");
var testSchema = joi_1["default"].object({
    name: joi_1["default"].string().required(),
    pdfUrl: joi_1["default"].string().required(),
    category: joi_1["default"].string().required(),
    discipline: joi_1["default"].string().required(),
    teacher: joi_1["default"].string().required()
});
exports["default"] = testSchema;
