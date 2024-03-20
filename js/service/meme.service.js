'use strict'

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
    // { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['funny', 'cat'] },
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['funny', 'cat'] },
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
