import express from 'express';
import { router } from "./routes";

const app = express();

app.use(router);

app.listen(3000, () => console.log("O servidor está sendo executado na porta 3000."));