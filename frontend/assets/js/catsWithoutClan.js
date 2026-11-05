import {url, getCookie} from './main.js'

const catsContainer = document.getElementById("cats-without-clan-container")

document.addEventListener('DOMContentLoaded' , async () => {
    showCats(await getCats())
})

catsContainer.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("mitglied-werden-button") || !getCookie("clanId")) {
        return
    }   

    const catId = event.target.dataset.catId
    
    await joinClan(catId, getCookie("clanId"))
})

async function getCats() {
    const data = await fetch(url + "cat/without-clan")
    const cats = await data.json()

    return cats
}

async function showCats(cats) {
    
    for (const cat of cats) {
        const div = document.createElement("div")

        const img = document.createElement("img")
        img.src = cat.avatarUrl
        img.classList.add("mitglied-img")
        div.appendChild(img)

        const name = document.createElement("div")
        name.textContent = cat.name
        name.classList.add("mitglied-name")
        div.appendChild(name)

        const rank = document.createElement("div")
        rank.textContent = cat.rank.name
        rank.classList.add("mitglied-rank")
        div.appendChild(rank)

        const speciality = document.createElement("div")
        speciality.textContent = cat.skill
        speciality.classList.add("mitglied-speciality")
        div.appendChild(speciality)

        const status = document.createElement("div")
        status.textContent = cat.status.name
        status.classList.add("mitglied-status")
        div.appendChild(status)

        const button = document.createElement("button")
        button.dataset.catId = cat.id
        button.textContent = "Clan beitreten"
        button.classList.add("mitglied-werden-button")
        div.appendChild(button)

        catsContainer.appendChild(div)
    }
}

async function joinClan(catId, clanId) {
    const response = await fetch(url + "cat/clan", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: catId,
            clanId: clanId
        })
    })

    response.json().then(data => {
        if (response.ok) {
            document.location.href = "./clans.html"
            console.log("Cat joined the clan successfully:", data)
        } else {
            console.error("Error joining the clan:", data)
        }   

    })
}