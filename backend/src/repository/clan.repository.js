import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllClans() {
  const clans = await prisma.clan.findMany()

  return clans
}

export async function createClan(clanData) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const newClan = await tx.clan.create({
        data: { name: clanData.name }
      })

      const newCat = await tx.cat.create({
        data: {
          name: clanData.bossName,
          avatarUrl: 'https://mafiacats.onrender.com/random',
          clanId: newClan.id,
          statusId: 1,
          rankId: 1
        }
      })

      const updatedClan = await tx.clan.update({
        where: { id: newClan.id },
        data: { bossId: newCat.id }
      })

      updatedClan.boss = newCat
      return updatedClan
    })

    console.log('Transaktion erfolgreich:', result)
    return result
  } catch (error) {
    console.error('Fehler in der Transaktion – alles wurde abgebrochen:', error)
  }
}