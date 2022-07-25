var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import authRepository from "../repositories/authRepository.js";
import * as handlerError from "../middlewares/handlerErrosMiddleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function create(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.getUser(email);
        if (user) {
            throw handlerError.conflict();
        }
        const salt = 10;
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const data = { email, password: encryptedPassword };
        yield authRepository.insert(data);
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.getUser(email);
        if (!user) {
            throw handlerError.unprocessableEntity();
        }
        if (bcrypt.compareSync(password, user.password)) {
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign({ id: user.id }, secretKey);
            const data = { token, userId: user.id };
            yield authRepository.login(data);
            return token;
        }
        else {
            throw handlerError.unauthorized();
        }
    });
}
const authService = {
    create,
    login
};
export default authService;
