import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline"; 
import { client } from "./database/client";

const { Parser } = require('json2csv');

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

        return response.json(pagamentos).status(200);

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

        for await ( let {matricula,valor,mes,status} of pagos ) {
            await client.pagos.create({
                data: {
                    matricula,
                    mes,
                    valor,
                    status,
                },
            });
        };

    console.log(pagos);
    
    return response.json(pagos).status(200);
        
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

        for await ( let {matricula,valor,mes,status} of abertos ) {
            await client.inadimplentes.create({
                data: {
                    matricula,
                    mes,
                    valor,
                    status,
                },
            });
        };

    console.log(abertos);
    
    return response.json(abertos).status(200);
            
});

router.get(
    "/total", async (request: Request, response: Response) => {
        
        const janeiro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "1",
                },
            },
        });

        let janVA = 0

        janeiro.filter(item => {
            if(item.status === "aberto") {
                janVA = janVA + item.valor
            }
        });

        let jan = 0

        janeiro.forEach(item => jan = jan + item.valor);

        const JanRes = janVA / jan;

        //console.log(JanRes);

        const fevereiro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "2",
                },
            },
        });

        let fevVA = 0

        fevereiro.filter(item => {
            if(item.status === "aberto") {
                fevVA = fevVA + item.valor
            };
        });

        let fev = 0

        fevereiro.forEach(item => fev = fev + item.valor);

        const fevRes = (fevVA + janVA) / (jan + fev);

        //console.log(fevRes);

        const marco = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "3",
                },
            },
        });

        let marVA = 0

        marco.filter(item => {
            if(item.status === "aberto") {
                marVA = marVA + item.valor
            };
        });

        let mar = 0

        marco.forEach(item => mar = mar + item.valor);

        const marRes = (marVA + fevVA + janVA) / (jan + fev + mar);

        //console.log(marRes);

        //return response.json(marRes);

        const abril = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "4",
                },
            },
        });

        let abrVA = 0

        abril.filter(item => {
            if(item.status === "aberto") {
                abrVA = abrVA + item.valor
            };
        });

        let abr = 0

        abril.forEach(item => abr = abr + item.valor);

        const abrRes = (abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr);

        //console.log(abrRes);

        //return response.json(abrRes);

        const maio = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "5",
                },
            },
        });

        let maiVA = 0

        maio.filter(item => {
            if(item.status === "aberto") {
                maiVA = maiVA + item.valor
            };
        });

        let mai = 0

        maio.forEach(item => mai = mai + item.valor);

        const maiRes = (maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai);

        //console.log(maiRes);

        const junho = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "6",
                },
            },
        });

        let junVA = 0

        junho.filter(item => {
            if(item.status === "aberto") {
                junVA = junVA + item.valor
            };
        });

        let jun = 0

        junho.forEach(item => jun = jun + item.valor);

        const junRes = (junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun);

        //console.log(junRes);

        const julho = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "7",
                },
            },
        });

        let julVA = 0

        julho.filter(item => {
            if(item.status === "aberto") {
                julVA = julVA + item.valor
            };
        });

        let jul = 0

        julho.forEach(item => jul = jul + item.valor);

        const julRes = (julVA + junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun + jul);

        //console.log(julRes);

        const agosto = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "8",
                },
            },
        });

        let agoVA = 0

        julho.filter(item => {
            if(item.status === "aberto") {
                agoVA = agoVA + item.valor
            };
        });

        let ago = 0

        julho.forEach(item => ago = ago + item.valor);

        const agoRes = (agoVA + julVA + junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun + jul + ago);

        //console.log(agoRes);

        const setembro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "9",
                },
            },
        });

        let setVA = 0

        setembro.filter(item => {
            if(item.status === "aberto") {
                setVA = setVA + item.valor
            };
        });

        let set = 0

        setembro.forEach(item => set = set + item.valor);

        const setRes = (setVA + agoVA + julVA + junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun + jul + ago + set);

        //console.log(setRes);
        
        const outubro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "10",
                },
            },
        });

        let outVA = 0

        outubro.filter(item => {
            if(item.status === "aberto") {
                outVA = outVA + item.valor
            };
        });

        let out = 0

        outubro.forEach(item => out = out + item.valor);

        const outRes = (outVA + setVA + agoVA + julVA + junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun + jul + ago + set + out);

        //console.log(outRes);
        
        const novembro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "11",
                },
            },
        });

        let novVA = 0

        novembro.filter(item => {
            if(item.status === "aberto") {
                novVA = novVA + item.valor
            };
        });

        let nov = 0

        novembro.forEach(item => nov = nov + item.valor);

        const novRes = (novVA + outVA + setVA + agoVA + julVA + junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun + jul + ago + set + out + nov);

        //console.log(novRes);

        const dezembro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "12",
                },
            },
        });

        let dezVA = 0

        dezembro.filter(item => {
            if(item.status === "aberto") {
                dezVA = dezVA + item.valor
            };
        });

        let dez = 0

        dezembro.forEach(item => dez = dez + item.valor);

        const dezRes = (dezVA + novVA + outVA + setVA + agoVA + julVA + junVA + maiVA + abrVA + marVA + fevVA + janVA) / (jan + fev + mar + abr + mai + jun + jul + ago + set + out + nov + dez);

    //console.log(dezRes);

    //console.log(janeiro);

    //let inadimplenciaJSON = JSON.stringify({"mes"});

   /* let inadimplenciaJSON = '{"mes": "janeiro", "inadimplencia": ['+ JanRes + ']},'+
                        '{"mes": "fevereiro", "inadimplencia": ['+ fevRes +']},'+
                        '{"mes": "marco", "inadimplencia": ['+ marRes +']},'+
                        '{"mes": "abril", "inadimplencia": ['+ abrRes +']},'+
                        '{"mes": "maio", "inadimplencia": ['+ maiRes +']},'+
                        '{"mes": "junho", "inadimplencia": ['+ junRes +']},'+
                        '{"mes": "julho", "inadimplencia": ['+ julRes +']},'+
                        '{"mes": "agosto", "inadimplencia": ['+ agoRes +']},'+
                        '{"mes": "setembro", "inadimplencia": ['+ setRes +']},'+
                        '{"mes": "outubro", "inadimplencia": ['+ outRes +']},'+
                        '{"mes": "novembro", "inadimplencia": ['+ novRes +']},'+
                        '{"mes": "dezembro", "inadimplencia": ['+ dezRes +']}' +
                        ']}'; */

    let inadimplenciaJSON = '[{ "mes": "janeiro", "inadimplencia": ' + JanRes + '}, {"mes": "fevereiro", "inadimplencia": '+ fevRes +'}, {"mes": "marco", "inadimplencia": '+ marRes +'}, {"mes": "abril", "inadimplencia": '+ abrRes +'}, {"mes": "maio", "inadimplencia": '+ maiRes +'}, {"mes": "junho", "inadimplencia": '+ junRes +'}, {"mes": "julho", "inadimplencia": '+ julRes +'}, {"mes": "agosto", "inadimplencia": '+ agoRes +'}, {"mes": "setembro", "inadimplencia": '+ setRes +'}, {"mes": "outubro", "inadimplencia": '+ outRes +'}, {"mes": "novembro", "inadimplencia": '+ novRes +'}, {"mes": "dezembro", "inadimplencia": '+ dezRes +'}]';

    const readableFile = new Readable();
        readableFile.push(inadimplenciaJSON);
        readableFile.push(null);

        const inadimplenciaLine = readline.createInterface({
            input: readableFile
        });

    const ina = JSON.parse(inadimplenciaJSON);

    console.log(ina);

    let inadimplenciaLineSplit: string[] = [] 

    for await (let line of inadimplenciaLine) {
        if (line !== invalidColumn) {
           inadimplenciaLineSplit = line.split(",");
        }
                        
    inadimplenciaLineSplit[0] ? ina.push({
        mes: inadimplenciaLineSplit[0],
        inadimplencia: Number(inadimplenciaLineSplit[1]),
    }) : [];
        
    /*for await ( let {mes,inadimplencia} of ina ) {
        await client.ina.create({
            data: {
                mes,
                inadimplencia,
            },
        });
    }*/
}

    const parseObj = new Parser();

    const csv = parseObj.parse(ina)

    console.log("CSV is: ", csv);

    return response.status(200);
});

router.get(
    "/inadimplencia/janeiro", async (request: Request, response: Response) => {
        
        const janeiro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "1",
                },
            },
        });

    let janeiroValorAberto = 0

    janeiro.filter(item => {
        if(item.status === "aberto") {
            janeiroValorAberto = janeiroValorAberto + item.valor
        };
    });

    let JaneiroTotal = 0

    janeiro.forEach(item => JaneiroTotal = JaneiroTotal + item.valor);

    const JaneiroResultado = janeiroValorAberto / JaneiroTotal;

    console.log(JaneiroResultado);

    return response.status(JaneiroResultado);

});

router.get(
    "/inadimplencia/fevereiro", async (request: Request, response: Response) => {
        
        const fevereiro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "2",
                },
            },
        });

    let fevereiroValorAberto = 0

    fevereiro.filter(item => {
        if(item.status === "aberto") {
            fevereiroValorAberto = fevereiroValorAberto + item.valor
        };
    });

    let fevereiroTotal = 0

    fevereiro.forEach(item => fevereiroTotal = fevereiroTotal + item.valor);

    const fevereiroResultado = fevereiroValorAberto / fevereiroTotal;

    console.log(fevereiroResultado);

    return response.json(fevereiroResultado);

});

router.get(
    "/inadimplencia/marco", async (request: Request, response: Response) => {
        
        const marco = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "3",
                },
            },
        });

    let marcoValorAberto = 0

    marco.filter(item => {
        if(item.status === "aberto") {
            marcoValorAberto = marcoValorAberto + item.valor
        };
    });

    let marcoTotal = 0

    marco.forEach(item => marcoTotal = marcoTotal + item.valor);

    const marcoResultado = marcoValorAberto / marcoTotal;

    console.log(marcoResultado);

    return response.json(marcoResultado);

});

router.get(
    "/inadimplencia/abril", async (request: Request, response: Response) => {
        
        const abril = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "4",
                },
            },
        });

    let abrilValorAberto = 0

    abril.filter(item => {
        if(item.status === "aberto") {
            abrilValorAberto = abrilValorAberto + item.valor
        };
    });

    let abrilTotal = 0

    abril.forEach(item => abrilTotal = abrilTotal + item.valor);

    const abrilResultado = abrilValorAberto / abrilTotal;

    console.log(abrilResultado);

    return response.json(abrilResultado);

});

router.get(
    "/inadimplencia/maio", async (request: Request, response: Response) => {
        
        const maio = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "5",
                },
            },
        });

    let maioValorAberto = 0

    maio.filter(item => {
        if(item.status === "aberto") {
            maioValorAberto = maioValorAberto + item.valor
        };
    });

    let maioTotal = 0

    maio.forEach(item => maioTotal = maioTotal + item.valor);

    const maioResultado = maioValorAberto / maioTotal;

    console.log(maioResultado);

    return response.json(maioResultado);

});

router.get(
    "/inadimplencia/junho", async (request: Request, response: Response) => {
        
        const junho = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "6",
                },
            },
        });

    let junhoValorAberto = 0

    junho.filter(item => {
        if(item.status === "aberto") {
            junhoValorAberto = junhoValorAberto + item.valor
        };
    });

    let junhoTotal = 0

    junho.forEach(item => junhoTotal = junhoTotal + item.valor);

    const junhoResultado = junhoValorAberto / junhoTotal;

    console.log(junhoResultado);

    return response.json(junhoResultado);

});

router.get(
    "/inadimplencia/julho", async (request: Request, response: Response) => {
        
        const julho = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "7",
                },
            },
        });

    let julhoValorAberto = 0

    julho.filter(item => {
        if(item.status === "aberto") {
            julhoValorAberto = julhoValorAberto + item.valor
        };
    });

    let julhoTotal = 0

    julho.forEach(item => julhoTotal = julhoTotal + item.valor);

    const julhoResultado = julhoValorAberto / julhoTotal;

    console.log(julhoResultado);

    return response.json(julhoResultado);

});

router.get(
    "/inadimplencia/agosto", async (request: Request, response: Response) => {
        
        const agosto = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "8",
                },
            },
        });

    let agostoValorAberto = 0

    agosto.filter(item => {
        if(item.status === "aberto") {
            agostoValorAberto = agostoValorAberto + item.valor
        };
    });

    let agostoTotal = 0

    agosto.forEach(item => agostoTotal = agostoTotal + item.valor);

    const agostoResultado = agostoValorAberto / agostoTotal;

    console.log(agostoResultado);

    return response.json(agostoResultado);

});

router.get(
    "/inadimplencia/setembro", async (request: Request, response: Response) => {
        
        const setembro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "9",
                },
            },
        });

    let setembroValorAberto = 0

    setembro.filter(item => {
        if(item.status === "aberto") {
            setembroValorAberto = setembroValorAberto + item.valor
        };
    });

    let setembroTotal = 0

    setembro.forEach(item => setembroTotal = setembroTotal + item.valor);

    const setembroResultado = setembroValorAberto / setembroTotal;

    console.log(setembroResultado);

    return response.json(setembroResultado);

});

router.get(
    "/inadimplencia/outubro", async (request: Request, response: Response) => {
        
        const outubro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "10",
                },
            },
        });

    let outubroValorAberto = 0

    outubro.filter(item => {
        if(item.status === "aberto") {
            outubroValorAberto = outubroValorAberto + item.valor
        };
    });

    let outubroTotal = 0

    outubro.forEach(item => outubroTotal = outubroTotal + item.valor);

    const outubroResultado = outubroValorAberto / outubroTotal;

    console.log(outubroResultado);

    return response.json(outubroResultado);

});

router.get(
    "/inadimplencia/novembro", async (request: Request, response: Response) => {
        
        const novembro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "11",
                },
            },
        });

    let novembroValorAberto = 0

    novembro.filter(item => {
        if(item.status === "aberto") {
            novembroValorAberto = novembroValorAberto + item.valor
        };
    });

    let novembroTotal = 0

    novembro.forEach(item => novembroTotal = novembroTotal + item.valor);

    const novembroResultado = novembroValorAberto / novembroTotal;

    console.log(novembroResultado);

    return response.json(novembroResultado);

});

router.get(
    "/inadimplencia/dezembro", async (request: Request, response: Response) => {
        
        const dezembro = await client.pagamentos.findMany({
            where: {
                mes: {
                    endsWith: "12",
                },
            },
        });

    let dezembroValorAberto = 0

    dezembro.filter(item => {
        if(item.status === "aberto") {
            dezembroValorAberto = dezembroValorAberto + item.valor
        };
    });

    let dezembroTotal = 0

    dezembro.forEach(item => dezembroTotal = dezembroTotal + item.valor);

    const dezembroResultado = dezembroValorAberto / dezembroTotal;

    console.log(dezembroResultado);

    return response.json(dezembroResultado);

});

export { router };