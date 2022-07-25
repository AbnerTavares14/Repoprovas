import prisma from "../config/db.js";
import disciplineRepository from "./disciplineRepository.js";

async function getTeachDiscipline(name: string, disciplineName: string) {
    const teacher = await prisma.teachers.findFirst({
        where: {
            name
        }
    });
    const discipline = await disciplineRepository.getDiscipline(disciplineName);

    return prisma.teachersDisciplines.findFirst({
        where: {
            teacherId: teacher?.id,
            disciplineId: discipline?.id
        }
    });
}

const teacherDisciplineRepository = {
    getTeachDiscipline
};

export default teacherDisciplineRepository;