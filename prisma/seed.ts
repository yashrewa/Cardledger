import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.card.upsert({
    where: { id: "axis-default" },
    update: {},
    create: {
      id: "axis-default",
      name: "Axis Bank Credit Card",
      bankName: "Axis Bank",
      billingStartDay: 11,
      billingEndDay: 11,
    },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
