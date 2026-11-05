import {url, getCookie} from './main.js'

const newFightButton = document.getElementById("new-fight-button")
const newClanSelect = document.getElementById("new-clan-select")


document.addEventListener("DOMContentLoaded", () => {
    if (!getCookie("districtId") || !getCookie("clanId")) {
        document.location.href = "./districts.html"
    }

    fetch(url + "clan")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        for (const clan of data) {
            if (clan.id == getCookie("clanId")) {
                continue
            }
            
            const option = document.createElement("option")
            option.value = clan.id
            option.textContent = clan.name
            newClanSelect.appendChild(option)
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });
})

newFightButton.addEventListener("click", (event) => {
    event.preventDefault()

    const newFight = {}
    newFight.districtId = getCookie("districtId")
    newFight.clanId = newClanSelect.value

    fetch(url + "fight", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFight)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json(); 
    })
    .then(data => {
        document.location.href = "./districts.html"
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
})