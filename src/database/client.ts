import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
    // ... you will write your Prisma Client queries here
  }
  
  main()
    .then(async () => {
      await client.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await client.$disconnect();
      process.exit(1)
    });

export { client };