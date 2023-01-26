# CSV-test

Consistem uma API de importação de CSV, usando typescript, express, prisma e o db postgres

Para conseguir inicializar a aplicação é necessário instalar as dependencias com o comando "npm intall dependencies"

Em .env configurar conexão com um banco de dados postgres

No SQL Shell (Postgres) criar uma database com o nome "csvdb"

Após isso é necessário criar a nova migrate do prisma com o comando "npx prisma migrate dev"

De um nome para a migração

Quando a migração for criada, é necessário gerar as tabelas do banco, com o comando "npx prisma generate"

Para inicialoza a aplicação é necessário digitar o comando "npm run dev"

Com isso a aplicação deve subir na porta 3000.
