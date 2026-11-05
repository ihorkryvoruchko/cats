import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCats() {
  const cats = await prisma.cat.findMany({
    select: {
        id: true,
        name: true,
        skill: true,
        avatarUrl: true,
        status: {
          select: {
            id: true,
            name: true
          }
        },
        rank: {
          select: {
            id: true,
            name: true
          }
        }
      }
  })

  return cats
}

export async function getCatsWithoutClan() {
  const cats = await prisma.cat.findMany({
    where: {
      clanId: null
    },
    select: {
        id: true,
        name: true,
        skill: true,
        avatarUrl: true,
        status: {
          select: {
            id: true,
            name: true
          }
        },
        rank: {
          select: {
            id: true,
            name: true
          }
        }
      }
  })

  return cats
}

export async function createCat(cat) {
  try {
    const newCat = await prisma.cat.create({
        data: {
          name: cat.name,
          skill: cat.skill,
          avatarUrl: cat.avatarUrl,
          clanId: Number(cat.clanId),
          statusId: Number(cat.statusId),
          rankId: Number(cat.rankId)
        }
      })

      return newCat
  } catch (error) {
    console.error('Fehler bei der Erstellung des Cats:', error)
    throw new Error('Katze konnte nicht erstellt werden: '  + error.message);
  }
}

export async function updateCatClan(cat) {
  try {
    const updatedCat = await prisma.cat.update({
      where: {
        id: Number(cat.id)
      },
      data: {
        clanId: Number(cat.clanId)
      },
      select: {
        id: true,
        name: true,
        skill: true,
        avatarUrl: true,
        status: {
          select: {
            id: true,
            name: true
          }
        },
        rank: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return updatedCat
  } catch (error) {
    console.error('Fehler bei der Aktualisierung des Cats:', error)
    throw new Error('Katze konnte nicht aktualisiert werden: ' + error.message)
  }
}