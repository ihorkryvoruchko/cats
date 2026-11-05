import {getAllCats, getCatsWithoutClan, createCat, updateCatClan} from '../repository/cat.repository.js'

export async function fetchAllCats() {
  const cats = await getAllCats()

  return cats
}

export async function fetchCatsWithoutClan() {
  const cats = await getCatsWithoutClan()

  return cats
}

export async function saveCat(catData) {
  try {
    const response = await fetch('https://mafiacats.onrender.com/cats')
    
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`)
    }

    const data = await response.json();
    catData.avatarUrl = data.cats[Math.floor(Math.random() * data.total -1)].url;
    const newCat = await createCat(catData)

    return newCat
  } catch (error) {
    throw error
  }
}

export async function patchCatClan(catData) {
  const updatedCat = await updateCatClan(catData) 

  return updatedCat
}