-- CreateTable
CREATE TABLE "pagamentos" (
    "id" SERIAL NOT NULL,
    "matricula" DOUBLE PRECISION NOT NULL,
    "mes" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inadimplencia" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "inaplencia" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "inadimplencia_pkey" PRIMARY KEY ("id")
);
