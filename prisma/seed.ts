import { prisma } from "./prisma-client";

const down = async () => {   }

  const up = async () => {   }

async function main() {
    try {
      await down();
      await up();
    } catch (error) {
      console.log(error);
    }
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });