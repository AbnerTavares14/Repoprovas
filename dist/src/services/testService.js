var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import categoryRepository from "../repositories/categoryRepository.js";
import * as handlerError from "../middlewares/handlerErrosMiddleware.js";
import testRepository from "../repositories/testRepository.js";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
function createTest(name, pdfUrl, category, discipline, instructor) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield teacherDisciplineRepository.getTeachDiscipline(instructor, discipline);
        const existCategory = yield categoryRepository.getCategorie(category);
        if (!teacher) {
            throw handlerError.unprocessableEntity();
        }
        if (!existCategory) {
            throw handlerError.unprocessableEntity();
        }
        const teacherDisciplineId = teacher.id;
        const categoryId = existCategory.id;
        const data = { name, pdfUrl, categoryId, teacherDisciplineId };
        yield testRepository.create(data);
    });
}
function getTestsByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield testRepository.getTestsByTeachers();
        return tests;
    });
}
function getTestsByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield testRepository.getTestsByDiscipline();
        return tests;
    });
}
const testService = {
    createTest,
    getTestsByTeachers,
    getTestsByDiscipline
};
export default testService;
