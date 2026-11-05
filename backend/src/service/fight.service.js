import {insertFight} from '../repository/fight.repository.js'

export async function setNewFight(fightData) {
  const fight = await insertFight(fightData)

  return fight
}