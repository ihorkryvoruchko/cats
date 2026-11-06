import { insertFight, findActiveFights, setFightWinner } from '../repository/fight.repository.js'

export async function setNewFight(fightData) {
  const fight = await insertFight(fightData)

  return fight
}

export async function findWinner() {
  const activeFights = await findActiveFights();
    if (activeFights.length === 0) {
        console.log('Keine aktiven Kämpfe gefunden.');
        return;
    }

    for (const fight of activeFights) {
        let districtBesitzerId = fight.district.clan.id
        let districtBesitzerCatCount = fight.district.clan._count.cats
        
        for (const clanFight of fight.clanFights) {
            const clan = clanFight.clan
            const catCount = clan._count.cats

            if (catCount > districtBesitzerCatCount) {
                districtBesitzerId = clan.id
                districtBesitzerCatCount = catCount
            }
        }

        const updatedFight = await setFightWinner(fight.id, districtBesitzerId)
        console.log(`Kampf ${updatedFight.id} abgeschlossen. Gewinner: Clan ${districtBesitzerId}`);
    }
  }