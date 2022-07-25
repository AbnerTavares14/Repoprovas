var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/db.js";
function create(test) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.tests.create({ data: test });
    });
}
function getTests() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.tests.findMany({
            include: {
                teachersDisciplines: {
                    include: {
                        disciplines: {
                            include: {
                                terms: true
                            }
                        },
                        teachers: true
                    },
                },
                categories: true
            }
        });
    });
}
function getTestBySelect() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.tests.findMany({
            select: {
                name: true,
                id: true,
                teachersDisciplines: {
                    select: {
                        id: true,
                        disciplines: {
                            select: {
                                name: true,
                                id: true,
                                terms: true
                            }
                        },
                        teachers: true
                    }
                }
            }
        });
    });
}
function getTestsByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.terms.findMany({
            select: {
                id: true,
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        teachersDisciplines: {
                            select: {
                                teachers: true,
                                tests: {
                                    select: {
                                        name: true,
                                        categories: true,
                                        pdfUrl: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    });
}
export function getTestsByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.teachers.findMany({
            select: {
                id: true, name: true,
                teachersDisciplines: {
                    select: {
                        disciplines: {
                            select: {
                                name: true,
                                terms: true
                            }
                        },
                        tests: {
                            select: {
                                name: true,
                                categories: true,
                                pdfUrl: true,
                                id: true
                            }
                        }
                    }
                }
            }
        });
    });
}
const testRepository = {
    create,
    getTestsByDiscipline,
    getTestBySelect,
    getTestsByTeachers
};
export default testRepository;
