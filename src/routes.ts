import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline"; 
import { client } from "./database/client";
import { pagamentos } from "@prisma/client";

const multer  = require("multer");

const router = Router();

const multerConfig = multer();

interface Pagamentos {
    matricula: number;
    mes: string;
    valor: number;
    status: string
};

const invalidColumn = "matricula,mes,valor,status"

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
        let pagamentosLineSplit: string[] = [] 

        for await (let line of pagamentosLine) {
            if (line !== invalidColumn) {
                pagamentosLineSplit = line.split(",");
            }
            
            pagamentosLineSplit[0] ? pagamentos.push({
                matricula: Number(pagamentosLineSplit[0]),
                mes: pagamentosLineSplit[1],
                valor: Number(pagamentosLineSplit[2]),
                status: pagamentosLineSplit[3],
            }) : [];   
        }

        for await ( let {matricula,valor,mes,status} of pagamentos ) {
            await client.pagamentos.create({
                data: {
                    matricula,
                    mes,
                    valor,
                    status,
                },
            })
        }

        console.log(pagamentos);

        return response.json(pagamentos);

    }
);

router.get(
    "/pagos", async (request: Request, response: Response) => {
            const pagos = await client.pagamentos.findMany({
                where: {
                    status: {
                        startsWith: "p",
                    },
                },
            });

        const pagosJSON = JSON.stringify(pagos);

       console.log(pagosJSON);

        return response.json(pagosJSON).status(200);
        
    });

router.get(
    "/inadimplentes", async (request: Request, response: Response) => {
        const abertos = await client.pagamentos.findMany({
            where: {
                status: {
                    startsWith: "a",
                },
            },
        });

    const abertosJSON = JSON.stringify(abertos);

    const pagamentos: Pagamentos[] = [];

    abertosJSON[0] ? pagamentos.push({
        matricula: Number(abertosJSON[0]),
        mes: abertosJSON[1],
        valor: Number(abertosJSON[2]),
        status: abertosJSON[3],
    }) : [];  

    console.log(abertosJSON);
    
    return response.json(abertosJSON).status(200);
            
});

/*router.get(
    "/relatorio",  async (request: Request, response: Response) => {
        const abertos = await client.pagamentos.findMany({
            where: {
                status: {
                    startsWith: "a" 
                },
            },
        },
    });*/

export { router };