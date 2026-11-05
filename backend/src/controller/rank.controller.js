import {fetchAllRanks} from '../service/rank.service.js'

export async function getRanks(req, res) {
  const ranks = await fetchAllRanks()

  res.status(200).json(ranks)
}
