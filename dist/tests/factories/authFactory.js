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
