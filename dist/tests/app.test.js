var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../src/config/db.js";
import app from "../src/app.js";
import supertest from "supertest";
import authFactory from "./factories/authFactory.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRaw `DELETE FROM users;`;
}));
describe("POST signup and login", () => {
    it("return status code 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = authFactory.generateAuthData();
        const result = yield supertest(app).post("/signup").send(body);
        const status = result.status;
        const userCreated = yield prisma.users.findFirst({
            where: { email: body.email }
        });
        expect(status).toEqual(201);
        expect(userCreated).not.toBeNull();
    }));
    it("return token", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = authFactory.generateAuthData();
        yield supertest(app).post("/signup").send(body);
        const result = yield supertest(app).post("/login").send(body);
        expect(result.text).not.toBeNull();
    }));
});
describe("POST and get tests", () => {
    it("return status code 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: "Projeto Valex", pdfUrl: "https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting", category: "Projeto", discipline: "React", teacher: "Diego Pinho" };
        const body = authFactory.generateAuthData();
        yield supertest(app).post("/signup").send(body);
        const result = yield supertest(app).post("/login").send(body);
        const token = result.text;
        const resultFinal = yield supertest(app).post("/tests").send(data).set("Authorization", token);
        expect(resultFinal.status).toEqual(201);
    }));
    it("return tests order by teachers", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = authFactory.generateAuthData();
        yield supertest(app).post("/signup").send(body);
        const result = yield supertest(app).post("/login").send(body);
        const token = result.text;
        const resultFinal = yield supertest(app).get("/tests/teachers").set("Authorization", token);
        expect(resultFinal.body).not.toBeNull();
    }));
    it("return tests order by disciplines", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = authFactory.generateAuthData();
        yield supertest(app).post("/signup").send(body);
        const result = yield supertest(app).post("/login").send(body);
        const token = result.text;
        const resultFinal = yield supertest(app).get("/tests/disciplines").set("Authorization", token);
        expect(resultFinal.body).not.toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
