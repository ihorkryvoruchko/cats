import {url, getCookie} from './main.js'

const clansContainer = document.getElementById("clans-container")

document.addEventListener('DOMContentLoaded' , async () => {
    showClans(await getClans())
})

clansContainer.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("mitglied-rekrutieren-button")) {
        return
    }
    const clanId = event.target.dataset.clanId
    document.cookie = "clanId=" + clanId + "; max-age=" + (7 * 24 * 60 * 60) + "; path=/";
    if (getCookie("clanId")) {
        document.location.href = "./cats-without-clan.html"
    }
})

async function getClans() {
    const data = await fetch(url + "clan")
    const clans = await data.json()

    return clans
}

async function showClans(clans) {
    
    for (const clan of clans) {
        const div = document.createElement("div")

        const img = document.createElement("img")
        img.src = clan.boss.avatarUrl
        img.classList.add("mitglied-img")
        div.appendChild(img)

        const name = document.createElement("div")
        name.textContent = clan.name
        name.classList.add("mitglied-name")
        div.appendChild(name)

        const button = document.createElement("button")
        button.textContent = "Mitglieder rekrutieren"
        button.classList.add("mitglied-rekrutieren-button")
        button.dataset.clanId = clan.id
        div.appendChild(button)

        clansContainer.appendChild(div)
    }
}