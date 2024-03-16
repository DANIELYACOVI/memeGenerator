'use strict'

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

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
            ctx.fillStyle = line.color
            ctx.font = line.size + 'px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(line.txt, canvas.width / 2, 50 + index * 30)
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
    canvas.style.display = 'block'

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