import { request, Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline"; 
import { client } from "./database/client";

const multer  = require("multer");

const router = Router();

const multerConfig = multer();

let objectDate = new Date();

interface Pagamentos {
    matricula: number;
    mes: string;
    valor: number;
    status: string
}

router.post(
    "/pagamentos", 
    multerConfig.single("file"), async (request: Request, response: Response) => {
        //console.log(_req.file?.buffer.toString("utf-8"));
        const { file } = request;
        const buffer = file?.buffer;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const pagamentosLine = readline.createInterface({
            input: readableFile
        });

        const pagamentos: Pagamentos[] = [];

        for await (let line of pagamentosLine) {
            const pagamentosLineSplit = line.split(",");

            pagamentos.push({
                matricula: Number(pagamentosLineSplit[0]),
                mes: pagamentosLineSplit[1],
                valor: Number(pagamentosLineSplit[2]),
                status: pagamentosLineSplit[3],
            });

            console.log(pagamentos);
        }

        /*for await ( let {matricula,valor,mes,status} of pagamentos ) {
            await csvdb.pagamentos.create({
                data: {
                    matricula,
                    mes,
                    valor,
                    status,
                },
            })
        }*/

        return response.json(pagamentos);
    }
);

export { router };