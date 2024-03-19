'use strict'

window.onload = function () {
    loadSavedMemes()
}

function loadSavedMemes() {
    const savedMemesContainer = document.getElementById('saved-memes-container')
    const savedMemes = loadFromStorage('savedMemes')

    if (savedMemes && savedMemes.length > 0) {
        savedMemesContainer.innerHTML = ''
        savedMemes.forEach((meme, index) => {
            const elMeme = document.createElement('div')
            elMeme.classList.add('saved-meme')

            const memeHTML = renderSavedMemeHTML(meme, index)
            elMeme.innerHTML = memeHTML

            savedMemesContainer.appendChild(elMeme)
        })
    } else {
        savedMemesContainer.innerHTML = '<p>No saved memes yet...</p>'
    }
}

function renderSavedMemeHTML(meme, index) {
    return `
        <div class="saved-memes-container">
            <img src="${meme.url}" alt="Saved Meme">
            <button class = "delete-btn" onclick="deleteSavedMeme(${index})">Delete</button>
        </div>
    `
}

function deleteSavedMeme(index){
    const savedMemes = loadFromStorage('savedMemes')

    if(savedMemes && savedMemes.length > index){
        savedMemes.splice(index, 1)
        saveToStorage('savedMemes', savedMemes)
        loadSavedMemes()
    }
}