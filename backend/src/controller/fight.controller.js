import {setNewFight} from '../service/fight.service.js'

export async function setFight(req, res) {
  const fight = await setNewFight(req.body)

  res.status(200).json(fight)
}
