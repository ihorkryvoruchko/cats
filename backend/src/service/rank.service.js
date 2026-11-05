import {getAllRanks} from '../repository/rank.repository.js'

export async function fetchAllRanks() {
  const ranks = await getAllRanks()

  return ranks
}