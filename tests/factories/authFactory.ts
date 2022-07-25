import prisma from "../../src/config/db.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

function generateAuthData() {
    const email = faker.internet.email();
    const password = faker.internet.password(10);
    return { email, password };
}

const authFactory = {
    generateAuthData,
};

export default authFactory;