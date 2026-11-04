import {getAllClans, createClan} from '../repository/clan.repository.js'

export async function fetchAllClans() {
  const clans = await getAllClans()

  return clans
}

export async function saveClan(clanData) {
  const newClan = await createClan(clanData)

  return newClan
}