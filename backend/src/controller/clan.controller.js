import {fetchAllClans, saveClan} from '../service/clan.service.js'

export async function getClans(req, res) {
  const clans = await fetchAllClans()

  res.status(200).json(clans)
}

export async function createClan(req, res) {
  const newClan = await saveClan(req.body)

  res.status(201).json(newClan)
}
