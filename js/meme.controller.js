'use strict'

let isDragging = false
let selectedLine = null
let offsetX, offsetY

const gallery = document.getElementById('gallery')
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
const colorPicker = document.getElementById('color-picker')

canvas.addEventListener('mousedown', onMouseDown)
canvas.addEventListener('mousemove', onMouseMove)
canvas.addEventListener('mouseup', onMouseUp)

function renderMeme() {
    const meme = getMemes()
    const img = new Image()

    img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0)

        meme.lines.forEach((line, index) => {
            ctx.fillStyle = line.color;
            ctx.font = line.size + 'px Arial'
            ctx.textAlign = 'center'

            ctx.fillText(line.txt, line.posX || canvas.width / 2, line.posY || 50 + index * 30)
        })
    }
    img.src = gImgs[meme.selectedImgId].url
}

gImgs.forEach((img, index) => {
    const imgElement = document.createElement('img')
    imgElement.src = img.url
    imgElement.classList.add('gallery-image')
    imgElement.dataset.index = index
    gallery.appendChild(imgElement)
})

function displayCanvasAndRenderMeme(imgIndex) {
    gallery.style.display = 'none'
    search.style.display = 'none'
    canvas.style.display = 'block'
    editor.style.display = 'block'

    gMeme.selectedImgId = imgIndex

    renderMeme()
}

gallery.addEventListener('click', function (event) {
    if (event.target.classList.contains('gallery-image')) {
        const imgIndex = event.target.dataset.index
        if (imgIndex !== undefined) {
            displayCanvasAndRenderMeme(parseInt(imgIndex))
        }
    }
})

const textInput = document.getElementById('text-input')
textInput.addEventListener('input', function () {
    updateMemeAndRender(this.value)
})

function updateMemeAndRender(text) {
    setLineTxt(text)
    renderMeme()
}

function setLineTxt(text) {
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].txt = text
}

function addNewLine() {
    const meme = getMemes()

    const newLine = {
        txt: '',
        size: 20,
        color: 'red'
    }

    meme.lines.push(newLine)

    meme.selectedLineIdx = meme.lines.length - 1

    renderMeme()

    document.getElementById('text-input').value = ''
}

function onMouseDown(event) {
    const mouseX = event.offsetX
    const mouseY = event.offsetY

    const meme = getMemes()
    meme.lines.forEach((line, index) => {
        if (mouseY >= 50 + index * 30 - line.size && mouseY <= 50 + index * 30) {
            selectedLine = index
            isDragging = true
            offsetX = mouseX - canvas.width / 2;
            offsetY = mouseY - (50 + index * 30 - line.size)
            canvas.classList.add('dragging')
            renderMeme()
        }
    })
}

function onMouseMove(event) {
    if (isDragging && selectedLine !== null) {
        const mouseX = event.offsetX
        const mouseY = event.offsetY

        const meme = getMemes()
        meme.lines[selectedLine].posX = mouseX - offsetX
        meme.lines[selectedLine].posY = mouseY - offsetY
        renderMeme()
    }
}

function onMouseUp() {
    isDragging = false
    selectedLine = null
    canvas.classList.remove('dragging')
}

function switchLine() {
    const meme = getMemes()

    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
}

function deleteLine() {
    const meme = getMemes()

    meme.lines.splice(meme.selectedLineIdx, 1)

    if (meme.lines.length === 0) {
        addNewLine()
    } else {
        meme.selectedLineIdx = Math.max(0, meme.selectedLineIdx - 1)

        renderMeme()
    }
}

function increaseFontSize() {
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].size += 2
    renderMeme()
}

function decreaseFontSize() {
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].size -= 2
    renderMeme()
}

colorPicker.addEventListener('change', function () {
    updateColor(this.value)
})

function updateColor(color) {
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].color = color
    renderMeme()
}

function addSticker(sticker) {
    const meme = getMemes()
    const selectedLineIdx = meme.selectedLineIdx

    meme.lines[selectedLineIdx].txt = sticker

    renderMeme()
}

function downloadCanvas(link, filename) {
    link.href = canvas.toDataURL()
    link.download = filename
}

function onSearchMems(keyword) {
    const filteredImages = gImgs.filter(img => img.keywords.some(key => key.includes(keyword.toLowerCase())))

    gallery.innerHTML = ''

    if (filteredImages.length === 0) {
        const noResultMessage = document.createElement('p')
        noResultMessage.textContent = "No results found."
        gallery.appendChild(noResultMessage)
    } else {
        filteredImages.forEach(img => {
            const imgElement = document.createElement('img')
            imgElement.src = img.url
            imgElement.classList.add('gallery-image')
            gallery.appendChild(imgElement)
        })
    }
}

document.getElementById('title').addEventListener('click', function () {
    window.location.href = 'index.html'
})

function onSave() {
    const meme = getMemes()
    const selectedImgUrl = gImgs[meme.selectedImgId].url

    const img = new Image()
    img.onload = function () {
        const canvasDataURL = canvas.toDataURL()
        meme.url = canvasDataURL
        saveMemeToStorage(meme)
    }
    img.src = selectedImgUrl

    const dialog = document.getElementById('save-dialog')
    dialog.showModal()
}

function saveMemeToStorage(meme) {
    const savedMemes = loadFromStorage('savedMemes') || []

    const selectedImgUrl = meme.url

    if (!selectedImgUrl) {
        console.error('Image URL not found for selectedImgId:', meme.selectedImgId)
        return
    }

    const clonedMeme = JSON.parse(JSON.stringify(meme))

    const canvasDataURL = canvas.toDataURL()

    clonedMeme.url = canvasDataURL

    savedMemes.push(clonedMeme)

    saveToStorage('savedMemes', savedMemes)
}