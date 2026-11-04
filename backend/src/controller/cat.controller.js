import {fetchAllCats, saveCat} from '../service/cat.service.js'

export async function getCats(req, res) {
  const cats = await fetchAllCats()

  res.status(200).json(cats)
}

export async function createCat(req, res) {
  const newCat = await saveCat(req.body)

  res.status(201).json(newCat)
}
