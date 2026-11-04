import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCats() {
  const cats = await prisma.cat.findMany()

  return cats
}

export async function createCat(cat) {
  try {
    const newCat = await prisma.cat.create({
        data: {
          name: cat.name,
          skill: cat.skill,
          avatarUrl: 'https://mafiacats.onrender.com/random',
          clanId: cat.clanId,
          statusId: cat.statusId,
          rankId: cat.rankId
        }
      })

      return newCat
  } catch (error) {
    console.error('Fehler bei der Erstellung des Cats:', error)
    throw new Error('Katze konnte nicht erstellt werden: '  + error.message);
  }
}