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


var gImgs = [
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['dog', 'baby'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['funny', 'baby'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'baby'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['funny', 'baby'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['funny', 'obama'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/2.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/003.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/004.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/5.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/005.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/006.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/8.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/9.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/12.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/19.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/Ancient-Aliens.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/img2.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/img4.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/img5.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/img6.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/img11.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/img12.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/leo.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/meme1.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/One-Does-Not-Simply.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/Oprah-You-Get-A.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/patrick.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/putin.jpg', keywords: ['funny', 'putin'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (various aspect ratios)/X-Everywhere.jpg', keywords: ['funny', 'cat'] },
]

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

function displayCanvasAndRenderMeme(imgIndex){
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
textInput.addEventListener('input',function() {
    updateMemeAndRender(this.value)
})

function updateMemeAndRender(text){
    setLineTxt(text)
    renderMeme()
}

function setLineTxt(text){
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
            offsetX = mouseX - canvas.width / 2
            offsetY = mouseY - (50 + index * 30 - line.size)
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
}

function switchLine() {
    const meme = getMemes()
    
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    
    renderMeme()
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

function increaseFontSize(){
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].size += 2
    renderMeme()
}

function decreaseFontSize(){
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].size -= 2
    renderMeme()
}

colorPicker.addEventListener('change', function() {
    updateColor(this.value)
})

function updateColor(color){
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].color = color
    renderMeme()
}

function addSticker(sticker){
    const meme = getMemes()
    const selectedLineIdx = meme.selectedLineIdx
    
    meme.lines[selectedLineIdx].txt = sticker

    renderMeme()
}

function downloadCanvas(link, filename){
    link.href = canvas.toDataURL()
    link.download = filename
}

function onSearchMems(keyword){
    const filteredImages = gImgs.filter(img => img.keywords.some(key =>key.includes(keyword.toLowerCase())))

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

document.getElementById('title').addEventListener('click', function(){
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

    const okButton = document.getElementById('close-dialog')
    okButton.addEventListener('click', function() {
        window.location.href = 'saved.html'
    })
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

var galleryTab = document.getElementById("gallery-tab")

galleryTab.addEventListener("click", function() {
    var galleryContainer = document.getElementById("gallery-container")
    var savedContainer = document.getElementById("saved-container")
    var randomContainer = document.getElementById("random-container")
    
    galleryContainer.style.display = "block"
    
    savedContainer.style.display = "none"
    randomContainer.style.display = "none"
})
