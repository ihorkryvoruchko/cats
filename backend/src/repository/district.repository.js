import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllDistricts() {
  const districts = await prisma.district.findMany({
      select: {
        id: true,
        name: true,
        fishration: true,
        clan: {
          select: {
            id: true,
            name: true,
            boss: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              }
            }
          }
        }
      }
    })

  return districts
}

export async function createDistrict(districtData) {
  try {
    const newDistrict = await prisma.district.create({ data: districtData })

    return newDistrict
  } catch (error) {
    console.error('Fehler bei der Erstellung des Districts:', error)
    throw new Error('District konnte nicht erstellt werden: ' + error.message);
  }
}
      