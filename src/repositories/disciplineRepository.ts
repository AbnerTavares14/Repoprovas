import prisma from "../config/db.js";

async function getDiscipline(name: string) {
    return prisma.disciplines.findFirst({
        where: {
            name
        }
    });
}

const disciplineRepository = {
    getDiscipline
};

export default disciplineRepository;