import {url, getCookie} from './main.js'

const districtsContainer = document.getElementById("districts-container")

document.addEventListener('DOMContentLoaded' , async () => {
    showDistricts(await getDistricts())
})

districtsContainer.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("district-fight-button")) {
        return
    }

    const districtId = event.target.dataset.districtId
    const clanId = event.target.dataset.clanId
    document.cookie = "districtId=" + districtId + "; max-age=" + (7 * 24 * 60 * 60) + "; path=/";
    document.cookie = "clanId=" + clanId + "; max-age=" + (7 * 24 * 60 * 60) + "; path=/";
    if (getCookie("districtId") && getCookie("clanId")) {
        document.location.href = "./begin-fight.html"
    }
})

async function getDistricts() {
    const data = await fetch(url + "district")
    const districts = await data.json()

    for (const district of districts) {

        for (const fight of district.fights) {
            const endTime = new Date(new Date(fight.endAt).getTime() + 60 * 1000)
            const delay = endTime.getTime() - Date.now()

            setTimeout(async () => {
                const data = await fetch(url + "fight/winner", {
                    method: "PATCH",
                    headers: {}
                })
                document.location.reload()
            }, delay)
        }
        
    }

    return districts
}


async function showDistricts(districts) {
    
    for (const district of districts) {
        const div = document.createElement("div")

        const name = document.createElement("div")
        name.textContent = district.name
        name.classList.add("district-name")
        div.appendChild(name)

        const clanName = document.createElement("div")
        clanName.textContent = district.clan.name
        clanName.classList.add("district-clan-name")
        div.appendChild(clanName)

        if (district.fights.length > 0) {
            div.classList.add("district-fight-ongoing")

            const fightInfo = document.createElement("div")
            fightInfo.textContent = "Kampf mit " + district.fights[0].clanFights[0].clan.name + " läuft bereits!"
            div.appendChild(fightInfo)
        } else {
            const fightButton = document.createElement("button")
            fightButton.dataset.districtId = district.id
            fightButton.dataset.clanId = district.clan.id
            fightButton.textContent = "Lass uns kämpfen!"
            fightButton.classList.add("district-fight-button")
            div.appendChild(fightButton)
        }

        districtsContainer.appendChild(div)
    }
}