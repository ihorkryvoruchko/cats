import { setNewFight, findWinner } from '../service/fight.service.js'

export async function setFight(req, res) {
  const fight = await setNewFight(req.body)

  res.status(201).json(fight)
}

export async function winner(req, res) {
  await findWinner()
  res.status(200).json({ message: "Gewinner erfolgreich ermittelt." })
}
