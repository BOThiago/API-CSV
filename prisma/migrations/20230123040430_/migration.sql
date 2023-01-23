-- CreateTable
CREATE TABLE "pagamentos" (
    "id" SERIAL NOT NULL,
    "matricula" INTEGER NOT NULL,
    "mes" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);
