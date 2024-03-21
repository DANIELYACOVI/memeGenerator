'use strict'

var gImgs = [
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['dog', 'baby'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['funny', 'baby'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'baby'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['funny', 'baby'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['funny', 'obama'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['funny', 'cat'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['funny', 'putin'], popularity: 0 },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['Toy Story', 'woody'], popularity: 0 },
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter your text',
            size: 20,
            color: 'black'
        }
    ]
}

function getMemes() {
    return gMeme
}

function onAddLine() {
    const meme = getMemes()

    const newLine = {
        txt: '',
        size: 20,
    }

    meme.lines.push(newLine)

    meme.selectedLineIdx = meme.lines.length - 1
}

function onAddSticker(sticker) {
    const meme = getMemes()

    const newStickerLine = {
        txt: sticker,
        size: 20,
        posX: canvas.width / 2,
        posY: canvas.height / 2,
    }

    meme.lines.push(newStickerLine)

    meme.selectedLineIdx = meme.lines.length - 1
}

function onUpdateColor(color) {
    const meme = getMemes()
    meme.lines[meme.selectedLineIdx].color = color
}

function onDeleteLine() {
    const meme = getMemes()

    meme.lines.splice(meme.selectedLineIdx, 1)

    if (meme.lines.length === 0) {
        addNewLine()
    } else {
        meme.selectedLineIdx = Math.max(0, meme.selectedLineIdx - 1)

    }
}