import { teachersDisciplines, tests } from "@prisma/client";
import categoryRepository from "../repositories/categoryRepository.js";
import teacherRepository from "../repositories/teacherRepository.js";
import * as handlerError from "../middlewares/handlerErrosMiddleware.js"
import testRepository from "../repositories/testRepository.js";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

export type CreateTest = Omit<tests, "id">

async function createTest(name: string, pdfUrl: string, category: string, discipline: string, instructor: string) {
    const teacher = await teacherDisciplineRepository.getTeachDiscipline(instructor, discipline);
    const existCategory = await categoryRepository.getCategorie(category);
    if (!teacher) {
        throw handlerError.unprocessableEntity();
    }
    if (!existCategory) {
        throw handlerError.unprocessableEntity();
    }
    const teacherDisciplineId = teacher.id;
    const categoryId = existCategory.id;
    const data = { name, pdfUrl, categoryId, teacherDisciplineId };
    await testRepository.create(data);
}

async function getTestsByTeachers() {
    const tests = await testRepository.getTestsByTeachers();
    return tests;
}

async function getTestsByDiscipline() {
    const tests = await testRepository.getTestsByDiscipline();
    return tests;
}


const testService = {
    createTest,
    getTestsByTeachers,
    getTestsByDiscipline
};

export default testService;