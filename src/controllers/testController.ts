import { Request, Response } from "express";
import testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, categorie, discipline, teacher } = req.body;
    await testService.createTest(name, pdfUrl, categorie, discipline, teacher);
    res.sendStatus(201);
}

export async function testsByTeachers(req: Request, res: Response) {
    const tests = await testService.getTestsByTeachers();
    res.send(tests);
}

export async function testsByDisciplines(req: Request, res: Response) {
    const tests = await testService.getTestsByDiscipline();
    res.send(tests);
}