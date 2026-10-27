import {url} from './main.js'

const mamberContainer = document.getElementById("members-container")

document.addEventListener('DOMContentLoaded' , async () => {
    showMembers(await getMembers())
})

async function getMembers() {
    const data = await fetch(url + "members")
    const members = await data.json()

    return members
}

async function showMembers(members) {
    console.log(members)
    for (const member of members) {
        const div = document.createElement("div")

        const img = document.createElement("img")
        img.src = member.avatarUrl
        img.classList.add("mitglied-img")
        div.appendChild(img)

        const name = document.createElement("div")
        name.textContent = member.name
        name.classList.add("mitglied-name")
        div.appendChild(name)

        const rank = document.createElement("div")
        rank.textContent = member.rank
        rank.classList.add("mitglied-rank")
        div.appendChild(rank)

        const speciality = document.createElement("div")
        speciality.textContent = member.speciality
        speciality.classList.add("mitglied-speciality")
        div.appendChild(speciality)

        const status = document.createElement("div")
        status.textContent = member.status
        status.classList.add("mitglied-status")
        div.appendChild(status)

        mamberContainer.appendChild(div)
    }
}