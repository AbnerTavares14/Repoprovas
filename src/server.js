"use strict";
exports.__esModule = true;
var app_js_1 = require("./app.js");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var port = process.env.PORT || 5000;
app_js_1["default"].listen(port, function () {
    console.log("Server running on port ".concat(port));
});
