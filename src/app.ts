import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes/index.js";
import handleErrorsMiddleware from "./middlewares/handlerErrosMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrorsMiddleware);


export default app;