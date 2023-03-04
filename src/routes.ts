import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline";
import { client } from "./database/client";

const { Parser } = require("json2csv");

const multer = require("multer");

const router = Router();

const multerConfig = multer();

interface Pagamentos {
    matricula: number;
    mes: string;
    valor: number;
    status: string;
}

const invalidColumn = "matricula,mes,valor,status";

router.post(
    "/pagamentos",
    multerConfig.single("file"),
    async (request: Request, response: Response) => {
        const { file } = request;

        const buffer = file?.buffer;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const pagamentosLine = readline.createInterface({
            input: readableFile,
        });

        const pagamentos: Pagamentos[] = [];
        let pagamentosLineSplit: string[] = [];

        for await (let line of pagamentosLine) {
            if (line !== invalidColumn) {
                pagamentosLineSplit = line.split(",");
            }

            pagamentosLineSplit[0]
                ? pagamentos.push({
                      matricula: Number(pagamentosLineSplit[0]),
                      mes: pagamentosLineSplit[1],
                      valor: Number(pagamentosLineSplit[2]),
                      status: pagamentosLineSplit[3],
                  })
                : [];
        }

        for await (let { matricula, valor, mes, status } of pagamentos) {
            await client.pagamentos.create({
                data: {
                    matricula,
                    mes,
                    valor,
                    status,
                },
            });
        }

        console.log(pagamentos);

        return response.json(pagamentos).status(200);
    }
);

router.get("/pagos", async (request: Request, response: Response) => {
    const pagos = await client.pagamentos.findMany({
        where: {
            status: {
                startsWith: "p",
            },
        },
    });

    for await (let { matricula, valor, mes, status } of pagos) {
        await client.pagos.create({
            data: {
                matricula,
                mes,
                valor,
                status,
            },
        });
    }

    console.log(pagos);

    return response.json(pagos).status(200);
});

router.get("/inadimplentes", async (request: Request, response: Response) => {
    const abertos = await client.pagamentos.findMany({
        where: {
            status: {
                startsWith: "a",
            },
        },
    });

    for await (let { matricula, valor, mes, status } of abertos) {
        await client.inadimplentes.create({
            data: {
                matricula,
                mes,
                valor,
                status,
            },
        });
    }

    console.log(abertos);

    return response.json(abertos).status(200);
});

router.get("/total", async (request: Request, response: Response) => {
    const result = [];
    let totalVA = 0;
    let total = 0;

    for (let i = 1; i <= 12; i++) {
        const mes = i.toString().padStart(2, "0");
        const pagamentos = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: mes,
                },
            },
        });

        let va = 0;
        let soma = 0;

        pagamentos.forEach((item) => {
            soma += item.valor;

            if (item.status === "aberto") {
                va += item.valor;
            }
        });

        const totalMes = soma;
        result.push({ mes: mes, total: totalMes });
        totalVA += va;
        total += totalMes;
    }

    const totalRes = totalVA / total;

    response.json({ meses: result, total: totalRes });
});

router.get(
    "/inadimplencia/:mes",
    async (request: Request, response: Response) => {
        const mes = request.params.mes;

        const pagamentos = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: mes,
                },
            },
        });

        let valorAberto = 0;

        pagamentos.filter((item) => {
            if (item.status === "aberto") {
                valorAberto = valorAberto + item.valor;
            }
        });

        let total = 0;

        pagamentos.forEach((item) => (total = total + item.valor));

        const resultado = valorAberto / total;

        console.log(resultado);

        if (resultado >= 0 && resultado <= 1) {
            response.json(resultado);
        } else {
            response.json("Não há resultados referente à esse mês.");
        }
    }
);

export { router };
