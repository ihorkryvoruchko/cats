import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertFight(fightData) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const now = new Date();
      const oneMinuteLater = new Date(now.getTime() + 60 * 1000);
      const newFight = await tx.fight.create({
        data: {
          startAt: now,
          endAt: oneMinuteLater,
          districtId: Number(fightData.districtId)
        }
      })

      const clanFight = await tx.clanFight.create({
        data: {
          fightId: newFight.id,
          clanId: Number(fightData.clanId)
        }
      })

      return { newFight, clanFight }  
    })      

    console.log('Transaktion erfolgreich:', result)
    return result
  } catch (error) {
    console.error('Fehler in der Transaktion – alles wurde abgebrochen:', error)
    throw error
  }
}

export async function findActiveFights() {
  try {
    const activeFights = await prisma.fight.findMany({
      where: {
        winnerId: null
      },
      select: {
        id: true,
        startAt: true,
        endAt: true,
        clanFights: {
          select: {
            id: true,
            clan: {
              select: {
                id: true,
                name: true,
                _count: {
                  select: { cats: true }
                }
              }
            }
          }
        },
        district: {
          select: {
            id: true, 
            name: true,
            clan: {
              select: {
                id: true,
                name: true,
                _count: {
                  select: { cats: true }
                }
              }
            }
          }
        }
      }
    })

    return activeFights
  } catch (error) {
    console.error('Fehler beim Finden aktiver Kämpfe:', error)
    throw error
  }
}

export async function setFightWinner(fightId, winnerClanId) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const updatedFight = await prisma.fight.update({
        where: { id: fightId },
        data: { winnerId: winnerClanId }
      })

      const updatedDistrict = await prisma.district.update({
        where: { id: updatedFight.districtId },
        data: { clanId: winnerClanId }
      })

      return updatedFight  
    })      

    console.log('Transaktion erfolgreich:', result)
    return result
  } catch (error) {
    console.error('Fehler in der Transaktion – alles wurde abgebrochen:', error)
    throw error
  }
} 
