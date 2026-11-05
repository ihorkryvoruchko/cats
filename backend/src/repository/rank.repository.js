import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllRanks() {
  const ranks = await prisma.rank.findMany({
    orderBy: {
      id: 'asc',
    }
  })
  return ranks
}