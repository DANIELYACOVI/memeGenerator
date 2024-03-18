'use strict'

window.onload = function () {
    loadSavedMemes()
}

function loadSavedMemes() {
    const savedMemesContainer = document.getElementById('saved-memes-container')
    const savedMemes = loadFromStorage('savedMemes')

    if (savedMemes && savedMemes.length > 0) {
        savedMemes.forEach(meme => {
            const elMeme = document.createElement('div')
            elMeme.classList.add('saved-meme')

            const memeHTML = renderSavedMemeHTML(meme)
            elMeme.innerHTML = memeHTML

            savedMemesContainer.appendChild(elMeme)
        })
    } else {
        savedMemesContainer.innerHTML = '<p>No saved memes yet...</p>'
    }
}

function renderSavedMemeHTML(meme) {
    return `
        <div class="saved-memes-container">
            <img src="${meme.url}" alt="Saved Meme">
        </div>
    `
}

function openSocialDialog() {
    document.getElementById('social-dialog').style.display = 'block'
}

window.onclick = function (event) {
    const dialog = document.getElementById('social-dialog')
    if (event.target == dialog) {
        dialog.style.display = 'none'
    }
}