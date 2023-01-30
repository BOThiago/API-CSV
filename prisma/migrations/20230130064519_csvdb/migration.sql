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
CREATE TABLE "pagos" (
    "id" SERIAL NOT NULL,
    "matricula" DOUBLE PRECISION NOT NULL,
    "mes" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inadimplentes" (
    "id" SERIAL NOT NULL,
    "matricula" DOUBLE PRECISION NOT NULL,
    "mes" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "inadimplentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ina" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "inadimplencia" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ina_pkey" PRIMARY KEY ("id")
);
