import prisma from "../config/db.js";

async function getTeacher(name: string) {
    return prisma.teachers.findFirst({
        where: {
            name
        }
    });
}

const teacherRepository = {
    getTeacher
};

export default teacherRepository;