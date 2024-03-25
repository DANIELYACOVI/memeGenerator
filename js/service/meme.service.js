'use strict'

var gImgs = [
    { id: generateUniqueId(), url: 'images/2.jpg', keywords: ['funny', 'dog'] },
    { id: generateUniqueId(), url: 'images/3.jpg', keywords: ['dog', 'baby'] },
    { id: generateUniqueId(), url: 'images/4.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/5.jpg', keywords: ['funny', 'baby'] },
    { id: generateUniqueId(), url: 'images/6.jpg', keywords: ['funny', 'baby'] },
    { id: generateUniqueId(), url: 'images/7.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/8.jpg', keywords: ['funny', 'baby'] },
    { id: generateUniqueId(), url: 'images/9.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/10.jpg', keywords: ['funny', 'obama'] },
    { id: generateUniqueId(), url: 'images/11.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/12.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/13.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/14.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/15.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/16.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'images/17.jpg', keywords: ['funny', 'putin'] },
    { id: generateUniqueId(), url: 'images/18.jpg', keywords: ['Toy Story', 'woody'] },
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