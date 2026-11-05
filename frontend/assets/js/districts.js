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

        const fightButton = document.createElement("button")
        fightButton.dataset.districtId = district.id
        fightButton.dataset.clanId = district.clan.id
        fightButton.textContent = "Lass uns kämpfen!"
        fightButton.classList.add("district-fight-button")
        div.appendChild(fightButton)

        districtsContainer.appendChild(div)
    }
}