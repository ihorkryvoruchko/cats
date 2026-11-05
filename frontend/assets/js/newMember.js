import {url} from './main.js'

const newMemberButton = document.getElementById("new-member-button")
const newMemberName = document.getElementById("new-member-name")
const newMemberRank = document.getElementById("new-member-rank")
const newMemberSpeciality = document.getElementById("new-member-speciality")
const memberPreviewImg = document.getElementById("member-preview-img")

document.addEventListener("DOMContentLoaded", () => {
    fetch(url + "rank")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        for (const rank of data) {
            const option = document.createElement("option");
            option.value = rank.id;
            option.textContent = rank.name;
            newMemberRank.appendChild(option);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
})

newMemberButton.addEventListener("click", (event) => {
    event.preventDefault()

    const newMember = {}
    newMember.name = newMemberName.value
    newMember.rankId = newMemberRank.value
    newMember.statusId = 1
    newMember.skill = newMemberSpeciality.value

    fetch(url + "cat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json(); 
    })
    .then(data => {
        memberPreviewImg.src = data.avatarUrl
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
})