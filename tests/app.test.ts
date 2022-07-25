import prisma from "../src/config/db.js";
import app from "../src/app.js";
import supertest from "supertest";
import authFactory from "./factories/authFactory.js";


beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users;`;
});

describe("POST signup and login", () => {
    it("return status code 201", async () => {
        const body = authFactory.generateAuthData();
        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        const userCreated = await prisma.users.findFirst({
            where: { email: body.email }
        });

        expect(status).toEqual(201);
        expect(userCreated).not.toBeNull();
    });


    it("return token", async () => {
        const body = authFactory.generateAuthData();
        await supertest(app).post("/signup").send(body);
        const result = await supertest(app).post("/login").send(body);
        expect(result.text).not.toBeNull();
    });

});

describe("POST test", () => {
    it("return status code 201", async () => {
        const data = { name: "Projeto Valex", pdfUrl: "https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting", categorie: "Projeto", discipline: "React", teacher: "Diego Pinho" };
        const body = authFactory.generateAuthData();
        await supertest(app).post("/signup").send(body);
        const result = await supertest(app).post("/login").send(body);
        const token = result.text;
        const resultFinal = await supertest(app).post("/test").send(data).set("Authorization", token);
        expect(resultFinal.status).toEqual(201);
    });

})

afterAll(async () => {
    await prisma.$disconnect();
});