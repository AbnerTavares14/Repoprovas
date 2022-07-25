"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authRouter_js_1 = require("./authRouter.js");
var testRouter_js_1 = require("./testRouter.js");
var router = (0, express_1.Router)();
router.use(authRouter_js_1["default"]);
router.use(testRouter_js_1["default"]);
exports["default"] = router;
