import {getAllCats, createCat} from '../repository/cat.repository.js'

export async function fetchAllCats() {
  const cats = await getAllCats()

  return cats
}

export async function saveCat(catData) {
  const newCat = await createCat(catData)

  return newCat
}