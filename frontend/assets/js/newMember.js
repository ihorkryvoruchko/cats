import {url} from './main.js'

const newMemberButton = document.getElementById("new-member-button")
const newMemberName = document.getElementById("new-member-name")
const newMemberRank = document.getElementById("new-member-rank")
const newMemberSpeciality = document.getElementById("new-member-speciality")
const memberPreviewImg = document.getElementById("member-preview-img")

newMemberButton.addEventListener("click", (event) => {
    event.preventDefault()

    const newMember = {}
    newMember.name = newMemberName.value
    newMember.rank = newMemberRank.value
    newMember.speciality = newMemberSpeciality.value

    fetch(url + "members", {
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