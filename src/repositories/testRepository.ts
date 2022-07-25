import prisma from "../config/db.js";
import { CreateTest } from "../services/testService.js";

async function create(test: CreateTest) {
    return prisma.tests.create({ data: test });
}

async function getTests() {
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
}

async function getTestBySelect() {
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
}

async function getTestsByDiscipline() {
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
}

export async function getTestsByTeachers() {
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
}

const testRepository = {
    create,
    getTestsByDiscipline,
    getTestBySelect,
    getTestsByTeachers
};

export default testRepository;