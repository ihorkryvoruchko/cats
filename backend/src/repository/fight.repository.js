import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertFight(fightData) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const newFight = await tx.fight.create({
        data: {
          
        }
      })
    })

    console.log('Transaktion erfolgreich:', result)
    return result
  } catch (error) {
    console.error('Fehler in der Transaktion – alles wurde abgebrochen:', error)
  }
}