var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import testService from "../services/testService.js";
export function createTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, pdfUrl, category, discipline, teacher } = req.body;
        yield testService.createTest(name, pdfUrl, category, discipline, teacher);
        res.sendStatus(201);
    });
}
export function testsByTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield testService.getTestsByTeachers();
        res.send(tests);
    });
}
export function testsByDisciplines(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield testService.getTestsByDiscipline();
        res.send(tests);
    });
}
