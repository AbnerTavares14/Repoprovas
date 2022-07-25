import jwt from "jsonwebtoken";
import { unauthorized } from "./handlerErrosMiddleware.js";

export async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
        throw unauthorized();
    }
    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
        res.locals.id = user.id;
        next();
    }
}