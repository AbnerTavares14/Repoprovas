import prisma from "../config/db.js";

async function getCategorie(name: string) {
    return prisma.categories.findFirst({
        where: {
            name
        }
    });
}

const categoryRepository = {
    getCategorie
};

export default categoryRepository;