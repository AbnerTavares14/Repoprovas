import { Router } from "express";
import { createTest, testsByDisciplines, testsByTeachers } from "../controllers/testController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", verifyToken, validateSchema(testSchema), createTest);
testRouter.get("/tests", verifyToken, testsByTeachers);
testRouter.get("/tests/discipline", verifyToken, testsByDisciplines);

export default testRouter;