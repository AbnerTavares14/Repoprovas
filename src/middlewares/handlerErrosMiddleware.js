"use strict";
exports.__esModule = true;
exports.unauthorized = exports.unprocessableEntity = exports.conflict = exports.notFoundError = void 0;
var serviceErrorToStatusCode = {
    notFound: 404,
    unprocessableEntity: 422,
    conflict: 409,
    unauthorized: 401
};
function notFoundError() {
    return { type: "notFound" };
}
exports.notFoundError = notFoundError;
function conflict() {
    return { type: "conflict" };
}
exports.conflict = conflict;
function unprocessableEntity() {
    return { type: "unprocessableEntity" };
}
exports.unprocessableEntity = unprocessableEntity;
function unauthorized() {
    return { type: "unauthorized" };
}
exports.unauthorized = unauthorized;
function handleErrorsMiddleware(err, req, res, next) {
    if (err.type) {
        return res.sendStatus(serviceErrorToStatusCode[err.type]);
    }
    console.log(err);
    res.sendStatus(500);
}
exports["default"] = handleErrorsMiddleware;
