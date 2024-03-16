'use strict'

var gImg = [
    { id: generateUniqueId(), url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] }
]

function renderMeme(){
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var img = new Image()
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        var text = gMeme.lines[gMeme.selectedLineIdx].txt
        var size = gMeme.lines[gMeme.selectedLineIdx].size
        var color = gMeme.lines[gMeme.selectedLineIdx].color
        ctx.fillStyle = color
        ctx.font = size + 'px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(text, canvas.width / 2, size)
    }
    img.src = 'meme-imgs/meme-imgs (square)/1.jpg'
}