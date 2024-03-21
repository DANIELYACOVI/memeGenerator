'use strict'

let isDragging = false
let selectedLine = null
let offsetX, offsetY

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
      ctx.fillStyle = line.color
      ctx.font = line.size + 'px Arial'
      ctx.textAlign = 'center'

      if (line.txt.trim() !== '') {
        ctx.fillText(line.txt, line.posX || canvas.width / 2, line.posY || 50 + index * 30)

        if (index === meme.selectedLineIdx) {
          const textWidth = ctx.measureText(line.txt).width
          const textHeight = line.size
          const padding = 5

          ctx.strokeStyle = 'black'
          ctx.lineWidth = 2

          ctx.beginPath()
          ctx.rect(
            (line.posX || canvas.width / 2) - (textWidth / 2) - padding,
            (line.posY || 50 + index * 30) - textHeight - padding,
            textWidth + 2 * padding,
            textHeight + 2 * padding
          )
          ctx.stroke()
        }
      }
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
  keywords.style.display = 'none'
  canvas.style.display = 'block'
  editor.style.display = 'block'

  gMeme.selectedImgId = imgIndex

  renderMeme()
}

gallery.addEventListener('click', function (event) {
  if (event.target.classList.contains('gallery-image')) {
    const imgIndex = event.target.dataset.index
    displayCanvasAndRenderMeme(imgIndex)
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
  meme.lines[meme.selectedLineIdx].posX = canvas.width / 2
  meme.lines[meme.selectedLineIdx].posY = 50 + meme.selectedLineIdx * 30
}

function addNewLine() {
  const meme = getMemes()

  const newLine = {
    txt: 'Enter your text',
    size: 20,
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
    if (mouseX >= line.posX - 100 &&
      mouseX <= line.posX + 100 &&
      mouseY >= line.posY - 100 &&
      mouseY <= line.posY + 100) {
      selectedLine = index
      isDragging = true
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
    meme.lines[selectedLine].posX = mouseX
    meme.lines[selectedLine].posY = mouseY
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

  const newStickerLine = {
    txt: sticker,
    size: 20,
    posX: canvas.width / 2,
    posY: canvas.height / 2,
  }

  meme.lines.push(newStickerLine)

  meme.selectedLineIdx = meme.lines.length - 1

  renderMeme()
}

function downloadCanvas(link, filename) {
  link.href = canvas.toDataURL()
  link.download = filename
}

function onSearchMems(keyword) {
  const filteredImages = gImgs.filter((img) => img.keywords.some((key) => key.includes(keyword.toLowerCase())))
  const gallery = document.getElementById('gallery')

  gallery.innerHTML = ''

  if (keyword.trim() === '') {
    gImgs.forEach((img) => {
      const elImg = document.createElement('img')
      elImg.src = img.url
      elImg.classList.add('gallery-image')
      elImg.dataset.index = gImgs.indexOf(img)
      gallery.appendChild(elImg)
    })
  } else if (filteredImages.length === 0) {
    const noResultMessage = document.createElement('p')
    noResultMessage.textContent = 'No results found.'
    gallery.appendChild(noResultMessage)
  } else {
    filteredImages.forEach((img) => {
      const imgElement = document.createElement('img')
      imgElement.src = img.url
      imgElement.classList.add('gallery-image')
      gallery.appendChild(imgElement)
    })
  }
}

function onKeywordClick(keyword) {
  document.getElementById('search').value = keyword
  onSearchMems(keyword)
  increaseFontSizeOfClickedKeyword(keyword)
}

function increaseFontSizeOfClickedKeyword(keyword) {
  const keywordsList = document.getElementById('keywords')
  const keywordElements = keywordsList.getElementsByTagName('li')
  
  for (var i = 0; i < keywordElements.length; i++) {
    if (keywordElements[i].textContent === keyword) {
      const currentFontSize = parseInt(keywordElements[i].style.fontSize || '16px')
      keywordElements[i].style.fontSize = (currentFontSize + 2) + 'px'
    }
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

function closeDialog() {
  var saveDialog = document.getElementById('save-dialog')
  saveDialog.close()
}

function saveMemeToStorage(meme) {
  const savedMemes = loadFromStorage('savedMemes') || []

  const selectedImgUrl = meme.url

  const clonedMeme = JSON.parse(JSON.stringify(meme))

  const canvasDataURL = canvas.toDataURL()

  clonedMeme.url = canvasDataURL

  savedMemes.push(clonedMeme)

  saveToStorage('savedMemes', savedMemes)

  updateSavedMemesSection(savedMemes)
}

function updateSavedMemesSection(savedMemes) {
  const savedMemesContainer = document.getElementById('saved-memes-container')
  savedMemesContainer.innerHTML = ''

  savedMemes.forEach((meme, index) => {
    const memeElement = document.createElement('div')
    memeElement.classList.add('saved-meme')

    const img = document.createElement('img')
    img.src = meme.url
    img.alt = 'Saved Meme'

    memeElement.appendChild(img)
    savedMemesContainer.appendChild(memeElement)
  })
}
